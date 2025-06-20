export const walletCommands = {
    "abortrescan": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.18.0",
        "complexity": "low"
      },
      "title": "abortrescan",
      "short": "Bricht einen aktuell laufenden Wallet-Rescan (z.B. nach Import eines Schlüssels) ab.",
      "examples": [
        "abortrescan"
      ],
      "details": "### Was ist `abortrescan`?\n\nMit diesem Befehl kannst du einen aktuell laufenden Rescan deiner Wallet stoppen. Ein Rescan wird z.B. ausgelöst, wenn du einen privaten Schlüssel importierst (`importprivkey`) oder andere Aktionen durchführst, die einen Blockchain-Scan nach relevanten Transaktionen erfordern.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Laufenden Rescan abbrechen:** Wenn ein Rescan sehr lange dauert oder versehentlich gestartet wurde, kannst du ihn mit diesem Befehl stoppen.\n*   **Wallet schneller wieder nutzbar machen:** Nach dem Abbruch steht die Wallet schneller wieder zur Verfügung, allerdings sind dann ggf. nicht alle Transaktionen erkannt.\n*   **Fehlersuche:** Hilfreich, wenn ein Rescan hängt oder nicht wie erwartet funktioniert.\n\n**Was ist das Ergebnis?**\n\nDer Befehl gibt einen Wahrheitswert zurück:\n```\ntrue | false\n```\n- `true`: Der Abbruch war erfolgreich.\n- `false`: Es lief kein Rescan oder der Abbruch war nicht möglich.\n\n**Hinweis:**\nUm den Fortschritt eines laufenden Rescans zu überwachen, verwende den Befehl `getwalletinfo` (dort findest du das Feld `scanning`).\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli importprivkey \"meinPrivaterSchluessel\"\nbitcoin-cli abortrescan\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"abortrescan\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getunconfirmedbalance": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.9.0",
        "complexity": "low"
      },
      "title": "getunconfirmedbalance",
      "short": "Zeigt das unbestätigte Wallet-Guthaben an (veraltet, identisch mit getbalances().mine.    untrusted_pending).",
      "examples": [
        "getunconfirmedbalance"
      ],
      "details": "### Was ist `getunconfirmedbalance`?\n\n**Hinweis: Dieser Befehl ist veraltet (DEPRECATED)    !**\n\n`getunconfirmedbalance` gibt das aktuelle unbestätigte Guthaben deiner Wallet zurück. Das ist    der Betrag, der sich aus Transaktionen ergibt, die zwar empfangen, aber noch nicht in einem Block   bestätigt wurden.\n\nSeit neueren Bitcoin Core Versionen ist dieser Befehl identisch mit dem Wert    `getbalances().mine.untrusted_pending`.\n\n**Was ist das Ergebnis?**\n\nEine einzelne Zahl (numeric),   die das unbestätigte Guthaben in BTC angibt:\n```\n0.12345678\n```\n\n**Empfohlene     Alternative:**\nNutze stattdessen den Befehl `getbalances` und lies dort das Feld `mine.    untrusted_pending` aus.\n"
    },
    "getwalletinfo": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.1.0",
        "complexity": "medium"
      },
      "title": "getwalletinfo",
      "short": "Zeigt verschiedene Informationen zum aktuellen Zustand der Wallet.",
      "examples": [
        "getwalletinfo"
      ],
      "details": "### Was ist `getwalletinfo`?\n\nMit diesem Befehl erhältst du ein ausführliches     JSON-Objekt mit vielen Details zum aktuellen Zustand deiner Wallet. Dazu gehören Name, Version,     Format, Guthaben (inkl. veralteter Felder), Anzahl der Transaktionen, Keypool-Infos,    Gebühreneinstellungen, HD-Status, Signierer-Status, Scanning-Fortschritt und mehr.\n\n**Wofür wird es   verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Wallet-Status prüfen:** Sieh auf einen     Blick, wie deine Wallet konfiguriert ist und wie viele Transaktionen sie enthält.\n*      **Guthaben-Übersicht:** Erfahre, wie viel BTC bestätigt, unbestätigt oder noch \"immature\" (z.B. aus   Mining) sind. Beachte: Einige Felder sind veraltet und identisch mit Werten aus `getbalances`.\n*      **Keypool-Management:** Prüfe, wie viele Schlüssel vorab generiert wurden und wie alt der älteste ist   (wichtig für Backups und Sicherheit).\n*   **Verschlüsselung & Sicherheit:** Sieh, ob und wie lange    die Wallet entsperrt ist, ob private Schlüssel aktiviert sind und ob ein externer Signierer verwendet   wird.\n*   **Scanning-Fortschritt:** Überwache, ob gerade ein Blockchain-Scan läuft und wie weit     dieser ist (`scanning`).\n*   **Technische Details:** Sieh, ob die Wallet Deskriptoren nutzt, ob sie    \"blank\" ist (keine Schlüssel/Skripte enthält) und wann sie erstmals genutzt wurde (`birthtime`).   \n\n**Was ist das Ergebnis?**\n\nEin JSON-Objekt mit vielen Feldern, z.B.:\n```json\n{\n     \"walletname\": \"meinewallet\",\n  \"walletversion\": 169900,\n  \"format\": \"sqlite\",\n    \"balance\": 0.5, // (veraltet, identisch mit getbalances().mine.trusted)\n  \"unconfirmed_balance\":    0.01, // (veraltet, identisch mit getbalances().mine.untrusted_pending)\n  \"immature_balance\": 0.   0, // (veraltet, identisch mit getbalances().mine.immature)\n  \"txcount\": 42,\n  \"keypoololdest\":    1718600000,\n  \"keypoolsize\": 1000,\n  \"keypoolsize_hd_internal\": 500,\n  \"unlocked_until\": 0,   \n  \"paytxfee\": 0.00001000,\n  \"hdseedid\": \"abcdef123456...\",\n  \"private_keys_enabled\": true,   \n  \"avoid_reuse\": false,\n  \"scanning\": false,\n  \"descriptors\": true,\n  \"external_signer\":    false,\n  \"blank\": false,\n  \"birthtime\": 1718500000,\n  \"lastprocessedblock\": {\n    \"hash\":    \"00000000...\",\n    \"height\": 850000\n  }\n}\n```\n\n**Wichtige Hinweise:**\n*   Die Felder    `balance`, `unconfirmed_balance` und `immature_balance` sind **veraltet** (DEPRECATED). Nutze    stattdessen `getbalances` für aktuelle Werte.\n*   Das Feld `scanning` zeigt entweder Details zum    aktuellen Scan oder `false`, wenn kein Scan läuft.\n*   Einige Felder erscheinen nur, wenn sie für   deine Wallet-Konfiguration relevant sind (z.B. `hdseedid`, `keypoolsize_hd_internal`).\n\n**Beispiele    für die Kommandozeile:**\n```bash\nbitcoin-cli getwalletinfo\n```\n```bash\ncurl --user myusername    --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getwalletinfo\", \"params\":   []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "listaddressgroupings": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.7.0",
        "complexity": "medium"
      },
      "title": "listaddressgroupings",
      "short": "Listet Gruppen von Adressen auf, die durch gemeinsame Nutzung als Inputs oder Wechselgeld     öffentlich als zusammengehörig erkannt wurden.",
      "examples": [
        "listaddressgroupings"
      ],
      "details": "### Was ist `listaddressgroupings`?\n\nMit diesem Befehl erhältst du eine Liste von     Adressgruppen deiner Wallet, bei denen durch die gemeinsame Verwendung als Input oder durch     Wechselgeld in vergangenen Transaktionen öffentlich wurde, dass sie vermutlich demselben Besitzer     gehören.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*       **Privacy-Analyse:** Zeigt, welche Adressen durch Transaktionsverhalten miteinander verknüpft sind und    somit öffentlich als zusammengehörig gelten.\n*   **Wallet-Übersicht:** Gibt einen Überblick über alle    Adressen deiner Wallet, gruppiert nach gemeinsamer Nutzung.\n*   **Buchhaltung:** Zeigt für jede   Adresse den aktuellen Saldo und ggf. das zugewiesene Label.\n\n**Was ist das Ergebnis?**\n\nEin    verschachteltes Array mit Gruppen von Adressen. Jede Gruppe enthält Arrays mit:\n- Die Bitcoin-Adresse    (String)\n- Den aktuellen Betrag auf dieser Adresse (Zahl, BTC)\n- Optional: Das Label der Adresse   (String)\n\n**Beispiel:**\n```json\n[\n  [\n    [\"bc1qxyz...\", 0.5, \"Sparen\"],\n    [\"bc1qabc...    \", 0.1]\n  ],\n  [\n    [\"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\", 0.0, \"Spende\"]\n  ]\n]    \n```\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli     listaddressgroupings\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\",    \"id\": \"curltest\", \"method\": \"listaddressgroupings\", \"params\": []}' -H 'content-type:    application/json' http://127.0.0.1:8332/\n```"
    },
    "listlockunspent": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.8.0",
        "complexity": "low"
      },
      "title": "listlockunspent",
      "short": "Listet alle aktuell gesperrten (temporär unspendierbaren) UTXOs deiner Wallet.",
      "examples": [
        "listlockunspent"
      ],
      "details": "### Was ist `listlockunspent`?\n\nMit diesem Befehl erhältst du eine Liste aller aktuell    gesperrten (temporär unspendierbaren) UTXOs (Unspent Transaction Outputs) deiner Wallet. Diese UTXOs    wurden mit dem Befehl `lockunspent` gesperrt und können daher vorübergehend nicht für neue   Transaktionen verwendet werden.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?)   :**\n\n*   **Überblick über gesperrte Coins:** Sieh, welche Outputs aktuell gesperrt sind und somit   nicht ausgegeben werden können.\n*   **Transaktionsmanagement:** Praktisch, wenn du bestimmte Coins    gezielt zurückhalten oder für spezielle Zwecke reservieren möchtest.\n*   **Fehlersuche:** Wenn du    dich wunderst, warum bestimmte Coins nicht ausgegeben werden, prüfe hier, ob sie gesperrt sind.  \n\n**Was ist das Ergebnis?**\n\nEin Array von Objekten, jeweils mit:\n- `txid`: Die Transaktions-ID     des gesperrten Outputs\n- `vout`: Die Output-Nummer innerhalb der     Transaktion\n\n**Beispiel:**\n```json\n[\n  {\n    \"txid\":    \"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\n    \"vout\": 1\n  }\n]  \n```\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli    listlockunspent\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\":   \"curltest\", \"method\": \"listlockunspent\", \"params\": []}' -H 'content-type: application/json'    http://127.0.0.1:8332/\n```\n\n**Tipp:**\n*   Mit `lockunspent` kannst du gezielt Outputs sperren oder    wieder freigeben."
    },
    "listwalletdir": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.17.0",
        "complexity": "low"
      },
      "title": "listwalletdir",
      "short": "Listet alle Wallets im Wallet-Verzeichnis deines Bitcoin Core Nodes auf.",
      "examples": [
        "listwalletdir"
      ],
      "details": "### Was ist `listwalletdir`?\n\nMit diesem Befehl erhältst du eine Liste aller Wallets,     die sich im Wallet-Verzeichnis deines Bitcoin Core Nodes befinden. Das ist besonders nützlich, wenn du    mehrere Wallets verwaltest oder prüfen möchtest, welche Wallet-Dateien vorhanden sind.\n\n**Wofür wird    es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Wallet-Übersicht:** Zeigt alle Wallets    an, die im Wallet-Verzeichnis gespeichert sind – unabhängig davon, ob sie aktuell geladen sind.\n*     **Verwaltung mehrerer Wallets:** Praktisch, wenn du verschiedene Wallets für unterschiedliche Zwecke     nutzt (z.B. Sparen, Alltag, Testnet).\n*   **Fehlersuche:** Hilft zu erkennen, ob eine erwartete    Wallet-Datei im Verzeichnis vorhanden ist.\n\n**Was ist das Ergebnis?**\n\nEin JSON-Objekt mit einer    Liste (`wallets`) von Objekten, die jeweils den Namen einer Wallet enthalten:\n```json\n{\n    \"wallets\": [\n    { \"name\": \"meinewallet\" },\n    { \"name\": \"testwallet\" }\n  ]\n}   \n```\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli listwalletdir\n```\n```bash\ncurl   --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\":    \"listwalletdir\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "listwallets": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.15.0",
        "complexity": "low"
      },
      "title": "listwallets",
      "short": "Listet alle aktuell geladene Wallets deines Bitcoin Core Nodes auf.",
      "examples": [
        "listwallets"
      ],
      "details": "### Was ist `listwallets`?\n\nMit diesem Befehl erhältst du eine Liste aller Wallets, die     aktuell im Speicher deines Bitcoin Core Nodes geladen sind. Das ist nützlich, wenn du mehrere Wallets     verwaltest und wissen möchtest, welche davon gerade aktiv sind.\n\n**Wofür wird es verwendet? (Was    kann ich damit herausfinden?):**\n\n*   **Überblick über geladene Wallets:** Sieh auf einen Blick,    welche Wallets aktuell geladen und damit nutzbar sind.\n*   **Multi-Wallet-Umgebungen:** Praktisch,    wenn du verschiedene Wallets für unterschiedliche Zwecke verwendest und zwischen ihnen wechseln    möchtest.\n*   **Fehlersuche:** Wenn eine Wallet nicht verfügbar ist, prüfe hier, ob sie geladen ist.  \n\n**Was ist das Ergebnis?**\n\nEin Array von Strings, jeweils der Name einer geladenen     Wallet:\n```json\n[\n  \"wallet.dat\",\n  \"cormorant\"\n]\n```\n\n**Hinweis:**\n*   Die Liste zeigt    **nur** die aktuell geladenen Wallets, nicht alle Wallet-Dateien im Wallet-Verzeichnis. Für eine    vollständige Übersicht aller Wallet-Dateien verwende `listwalletdir`.\n*   Für Details zu einer    bestimmten Wallet nutze `getwalletinfo`.\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli   listwallets\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\":    \"curltest\", \"method\": \"listwallets\", \"params\": []}' -H 'content-type: application/json' http://   127.0.0.1:8332/\n```"
    },
    "newkeypool": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.13.0",
        "complexity": "medium"
      },
      "title": "newkeypool",
      "short": "Leert und füllt den Keypool der Wallet komplett neu auf.",
      "examples": [
        "newkeypool"
      ],
      "details": "### Was ist `newkeypool`?\n\nMit diesem Befehl wird der gesamte Keypool deiner Wallet     gelöscht und mit neuen Schlüsseln aufgefüllt. Der Keypool ist ein Vorrat an vorab generierten Adressen/   Schlüsseln, die deine Wallet für neue Empfangsadressen oder Wechselgeld verwendet.\n\n**Wichtige    Hinweise:**\n\n*   **Nicht-HD-Wallets:** Nach dem Ausführen von `newkeypool` **muss** sofort ein neues   Backup erstellt werden! Nur so sind alle neuen Schlüssel gesichert.\n*   **HD-Wallets:** Wenn du ein     Backup einer HD-Wallet wiederherstellst, das vor dem Ausführen von `newkeypool` erstellt wurde,     erscheinen neue Adressen ggf. nicht automatisch. Die Coins sind nicht verloren, aber die Wallet findet    sie erst nach erneutem Ausführen von `newkeypool` und anschließendem Rescan.\n*   **Verschlüsselte    Wallet:** Ist deine Wallet verschlüsselt, musst du sie vorher mit `walletpassphrase` entsperren.   \n\n**Was ist das Ergebnis?**\n\nDer Befehl gibt `null` zurück.\n\n**Beispiele für die   Kommandozeile:**\n```bash\nbitcoin-cli newkeypool\n```\n```bash\ncurl --user myusername --data-binary '    {\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"newkeypool\", \"params\": []}' -H    'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "walletlock": {
      "meta": {
        "category": "wallet",
        "params": [],
        "rpcVersion": "0.1.0",
        "complexity": "low"
      },
      "title": "walletlock",
      "short": "Sperrt die Wallet wieder (entfernt den Entschlüsselungsschlüssel aus dem Speicher).",
      "examples": [
        "walletlock"
      ],
      "details": "### Was ist `walletlock`?\n\nMit diesem Befehl wird der Entschlüsselungsschlüssel deiner    Wallet aus dem Arbeitsspeicher entfernt – die Wallet ist damit wieder gesperrt. Nach dem Sperren musst    du die Wallet erneut mit `walletpassphrase` entsperren, bevor du Befehle ausführen kannst, die Zugriff   auf private Schlüssel benötigen (z.B. Senden von Coins, Signieren).\n\n**Wofür wird es verwendet? (Was     kann ich damit herausfinden?):**\n\n*   **Sicherheit erhöhen:** Sperre die Wallet sofort nach     sensiblen Aktionen, damit der Schlüssel nicht länger als nötig im Speicher bleibt.\n*       **Automatisierung:** In Skripten kannst du nach Abschluss aller Aktionen die Wallet gezielt wieder    sperren.\n*   **Zugriffsschutz:** Verhindert, dass weitere Aktionen mit privaten Schlüsseln ohne    erneute Passphrase-Eingabe möglich sind.\n\n**Was ist das Ergebnis?**\n\nDer Befehl gibt `null` zurück.  \n\n**Beispiele für die Kommandozeile:**\n```bash\n# Wallet für 2 Minuten entsperren\nbitcoin-cli    walletpassphrase \"meinPasswort\" 120\n\n# Transaktion durchführen\nbitcoin-cli sendtoaddress   \"bc1q09vm5lfy0j5reeulh4x5752q25uqqvz34hufdl\" 1.0\n\n# Wallet sofort wieder sperren\nbitcoin-cli    walletlock\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\":    \"curltest\", \"method\": \"walletlock\", \"params\": []}' -H 'content-type: application/json' http://   127.0.0.1:8332/\n```"
    },
}