use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::{IntoResponse, Json},
    routing::get,
    Router,
};
use bitcoincore_rpc::{Auth, Client, RpcApi};
use serde_json::{json, Value};
use std::{collections::HashMap, env, sync::Arc};

#[derive(Clone)]
pub struct AppState {
    client: Arc<Client>,
}

pub async fn create_app() -> Router {
    let rpc_user = env::var("RPC_USER").expect("RPC_USER nicht gesetzt");
    let rpc_password = env::var("RPC_PASSWORD").expect("RPC_PASSWORD nicht gesetzt");
    let rpc_host = env::var("RPC_HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let rpc_port = env::var("RPC_PORT")
        .unwrap_or_else(|_| "8332".to_string())
        .parse::<u16>()
        .expect("RPC_PORT muss eine gültige Portnummer sein");
    let rpc_url = format!("http://{}:{}", rpc_host, rpc_port);

    let rpc = Client::new(&rpc_url, Auth::UserPass(rpc_user, rpc_password))
        .expect("RPC-Client konnte nicht erstellt werden");

    let state = AppState {
        client: Arc::new(rpc),
    };

    Router::new()
        .route("/api/rpc", get(rpc_universal))
        .with_state(state)
}

pub async fn rpc_universal(
    State(state): State<AppState>,
    Query(query): Query<HashMap<String, String>>,
) -> impl IntoResponse {
    let method = match query.get("method") {
        Some(m) => m.clone(),
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({ "error": "Missing 'method' parameter" })),
            )
                .into_response();
        }
    };

    let mut params: Vec<Value> = Vec::new();
    for i in 1.. {
        let param_key = format!("param{}", i);
        if let Some(param_str) = query.get(&param_key) {
            let value = serde_json::from_str(param_str).unwrap_or_else(|_| json!(param_str));
            params.push(value);
        } else {
            break;
        }
    }

    match state.client.call::<Value>(&method, &params) {
        Ok(result) => (StatusCode::OK, Json(result)).into_response(),
        Err(e) => {
            let error_message = format!("{}", e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": { "message": error_message } })),
            )
                .into_response()
        }
    }
}