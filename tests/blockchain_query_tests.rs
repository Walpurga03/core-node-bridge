use axum::{
    body::{to_bytes, Body},
    http::{Request, Response, StatusCode},
};
use bitcoincore_rpc::{Auth, Client, RpcApi};
use core_node_bridge::create_app;
use dotenvy::from_filename;
use serde_json::{json, Value};
use tower::ServiceExt; // Wichtig für .oneshot()

// =================================================================================
// TEST HARNESS
// =================================================================================

/// Eine Hilfsstruktur, um den Boilerplate-Code für das Setup von Tests zu verwalten.
/// Erstellt eine dedizierte, vorfinanzierte Wallet für die Test-Session und sorgt für deren Bereinigung.
struct TestHarness {
    app: axum::Router,
    base_rpc: Client,   // Client für generische Befehle (z.B. getblock)
    wallet_rpc: Client, // Client für die dedizierte Test-Wallet
    wallet_name: String,
}

impl TestHarness {
    /// Erstellt einen neuen TestHarness, lädt Umgebungsvariablen und initialisiert Clients und eine Wallet.
    async fn new() -> Self {
        from_filename(".env.test").expect("Die .env.test Datei wurde nicht gefunden.");
        let app = create_app().await;

        // Basis-RPC-Client-Setup
        let rpc_user = std::env::var("RPC_USER").unwrap();
        let rpc_pass = std::env::var("RPC_PASSWORD").unwrap();
        let rpc_host = std::env::var("RPC_HOST").unwrap();
        let rpc_port = std::env::var("RPC_PORT").unwrap();
        let rpc_url = format!("http://{}:{}", rpc_host, rpc_port);
        let rpc_auth = Auth::UserPass(rpc_user, rpc_pass);
        let base_rpc = Client::new(&rpc_url, rpc_auth.clone()).unwrap();

        // Dedizierte Wallet für diesen Testlauf erstellen
        let wallet_name = format!("harness_{}", std::time::UNIX_EPOCH.elapsed().unwrap().as_nanos());
        base_rpc.create_wallet(&wallet_name, None, None, None, None).unwrap();
        let wallet_rpc_url = format!("{}/wallet/{}", rpc_url, wallet_name);
        let wallet_rpc = Client::new(&wallet_rpc_url, rpc_auth).unwrap();

        // Sicherstellen, dass die Wallet Blöcke für Coinbase-Transaktionen hat (Vorfinanzierung)
        let address = wallet_rpc.get_new_address(None, None).unwrap().assume_checked();
        wallet_rpc.generate_to_address(101, &address).unwrap();

        TestHarness { app, base_rpc, wallet_rpc, wallet_name }
    }

    /// Führt eine Anfrage aus und gibt die rohe Antwort zurück.
    async fn make_request_raw(&mut self, uri: &str) -> Response<Body> {
        let request = Request::builder().uri(uri).body(Body::empty()).unwrap();
        self.app.clone().oneshot(request).await.unwrap()
    }

    /// Führt eine Anfrage aus, prüft auf HTTP 200 OK und gibt den JSON-Body als `Value` zurück.
    async fn make_request(&mut self, uri: &str) -> Value {
        let response = self.make_request_raw(uri).await;
        let status = response.status();
        let body = to_bytes(response.into_body(), usize::MAX).await.unwrap();
        assert_eq!(status, StatusCode::OK, "Erwarteter OK-Status für URI '{}', aber erhielt {}. Body: {}", uri, status, String::from_utf8_lossy(&body));
        serde_json::from_slice(&body).unwrap_or_else(|e| {
            panic!("Konnte JSON nicht parsen von '{}': {}\nBody: {}", uri, e, String::from_utf8_lossy(&body));
        })
    }

    /// Generiert einen neuen Block an eine neue Adresse und gibt den Block-Hash zurück.
    fn generate_block(&self) -> bitcoincore_rpc::bitcoin::BlockHash {
        let address = self.wallet_rpc.get_new_address(None, None).unwrap().assume_checked();
        self.wallet_rpc.generate_to_address(1, &address).unwrap()[0]
    }
}

/// Implementiert Drop, um die Wallet automatisch zu entladen, wenn der Harness
/// am Ende eines Tests aus dem Geltungsbereich geht. Dies garantiert Test-Isolation.
impl Drop for TestHarness {
    fn drop(&mut self) {
        println!("Räume auf: Entlade Wallet '{}'", self.wallet_name);
        self.base_rpc.unload_wallet(Some(&self.wallet_name)).unwrap();
    }
}

// =================================================================================
// BLOCKCHAIN QUERY TESTS
// =================================================================================

#[tokio::test]
async fn test_simple_commands() {
    let mut harness = TestHarness::new().await;
    let commands = [
        "getbestblockhash", "getblockchaininfo", "getblockcount", "getdifficulty",
        "getmempoolinfo", "getrawmempool", "gettxoutsetinfo", "verifychain",
        "getchaintips", "getchaintxstats", "savemempool", "getchainstates",
    ];
    for cmd in commands {
        println!("Teste einfachen Befehl: {}", cmd);
        let _ = harness.make_request(&format!("/api/rpc?method={}", cmd)).await;
    }
}

#[tokio::test]
async fn test_commands_with_blockhash_param() {
    let mut harness = TestHarness::new().await;
    let block_hash = harness.generate_block();
    let commands = [
        "getblock", "getblockheader", "getblockstats", 
        "getdeploymentinfo", "getblockfilter", "preciousblock",
    ];
    for cmd in commands {
        println!("Teste Befehl mit Block-Hash: {}", cmd);
        let _ = harness.make_request(&format!("/api/rpc?method={}&param1={}", cmd, block_hash)).await;
    }
}

#[tokio::test]
async fn test_getblockhash_at_height() {
    let mut harness = TestHarness::new().await;
    let value = harness.make_request("/api/rpc?method=getblockhash&param1=0").await;
    assert!(value.is_string() && value.as_str().unwrap().len() == 64);
}

#[tokio::test]
async fn test_gettxout_on_coinbase() {
    let mut harness = TestHarness::new().await;
    let block_hash = harness.generate_block();
    let block = harness.base_rpc.get_block(&block_hash).unwrap();
    let coinbase_txid = block.txdata[0].txid();
    let value = harness.make_request(&format!("/api/rpc?method=gettxout&param1={}&param2=0", coinbase_txid)).await;
    assert!(value["value"].is_number());
    assert_eq!(value["confirmations"], 1);
}

#[tokio::test]
async fn test_scantxoutset_with_descriptor() {
    let mut harness = TestHarness::new().await;
    let address = harness.wallet_rpc.get_new_address(None, None).unwrap().assume_checked();
    let descriptor = harness.wallet_rpc.get_descriptor_info(&format!("addr({})", address)).unwrap().descriptor;
    let scanobjects = json!([descriptor]).to_string();
    let encoded_scanobjects = urlencoding::encode(&scanobjects);
    let uri = format!("/api/rpc?method=scantxoutset&param1=start&param2={}", encoded_scanobjects);
    let value = harness.make_request(&uri).await;
    assert_eq!(value["success"], true);
    assert!(value["unspents"].is_array());
}

#[tokio::test]
async fn test_getmempoolentry_with_params() {
    let mut harness = TestHarness::new().await;
    let recipient = harness.wallet_rpc.get_new_address(None, None).unwrap().assume_checked();
    let amount = bitcoincore_rpc::bitcoin::Amount::from_btc(0.1).unwrap();
    let txid = harness.wallet_rpc.send_to_address(&recipient, amount, None, None, None, None, None, None).unwrap();
    let tx_info: Value = harness.wallet_rpc.call("getrawtransaction", &[json!(txid), json!(true)]).unwrap();
    let expected_wtxid = tx_info["hash"].clone();
    let value = harness.make_request(&format!("/api/rpc?method=getmempoolentry&param1={}", txid)).await;
    assert_eq!(value["wtxid"], expected_wtxid);
}

#[tokio::test]
async fn test_invalid_method_error() {
    let mut harness = TestHarness::new().await;
    let response = harness.make_request_raw("/api/rpc?method=gibtesnicht").await;
    assert_eq!(response.status(), StatusCode::INTERNAL_SERVER_ERROR);
    let body = to_bytes(response.into_body(), usize::MAX).await.unwrap();
    let error_response: Value = serde_json::from_slice(&body).unwrap();
    assert!(error_response["error"]["message"].as_str().unwrap().contains("Method not found"));
}

// HINWEIS: Einige RPC-Befehle sind für eine automatisierte Standard-Testsuite ungeeignet,
// da sie destruktiv sind (`pruneblockchain`), eine spezielle Konfiguration erfordern (`getblockfrompeer`),
// sehr lange dauern oder große Dateien erzeugen (`dumptxoutset`, `loadtxoutset`).
// Die wichtigsten und am häufigsten verwendeten Befehle sind hier abgedeckt.