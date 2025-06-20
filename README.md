# Core Node Bridge

Ein Web-Frontend für Bitcoin Core RPC-Kommandos  
**Projektstatus:** In Entwicklung

---

## Übersicht

Core Node Bridge ist ein modernes Web-Frontend, mit dem du die wichtigsten Bitcoin Core RPC-Kommandos einfach im Browser absetzen und die Ergebnisse übersichtlich anzeigen lassen kannst.  
Das Projekt besteht aus einem Rust-Backend (Axum) und einem React-Frontend.

---

## Features

- Übersichtliche Kategorien für Blockchain, Netzwerk, Wallet u.v.m.
- Unterstützung für mehrere Sprachen (i18n, aktuell Deutsch und Englisch)
- Komfortable Anzeige und Abfrage von:
  - Blockchain-Info (`getblockchaininfo`)
  - Best Block Hash (`getbestblockhash`)
  - Node-Info (`getnetworkinfo`)
  - ...und viele weitere Kommandos
- Responsive Design, dunkles Theme
- Einfache Erweiterbarkeit für weitere RPC-Befehle

---

## Voraussetzungen

- Bitcoin Core Node (empfohlen: Version 29.0.0 oder neuer)
- Rust (empfohlen: stable)
- Node.js & npm (für das Frontend)
- Zugangsdaten für deinen Bitcoin Core RPC (siehe `.env`)

---

## Installation

### 1. Backend (Rust)

```sh
cd core_node_bridge
cp .env.example .env   # Passe die .env mit deinen RPC-Daten an
cargo build --release
cargo run --release
```

### 2. Frontend (React)

```sh
cd frontend
npm install
npm run dev
```

Das Frontend läuft standardmäßig auf [http://localhost:5173](http://localhost:5173)  
Das Backend auf [http://localhost:3000](http://localhost:3000)

---

## Konfiguration

Trage deine Bitcoin Core RPC-Daten in die Datei `.env` im Projekt-Root ein:

```env
RPC_USER=deinuser
RPC_PASSWORD=deinpasswort
RPC_HOST=127.0.0.1
RPC_PORT=8332
RUST_LOG=info
```

---

## Dokumentation der RPC-Kommandos

Eine vollständige Beschreibung aller Bitcoin Core RPC-Kommandos findest du hier:  
👉 [Bitcoin Core 29.0.0 RPC Documentation](https://bitcoincore.org/en/doc/29.0.0/rpc/)

---

## Screenshots

*(Hier kannst du später Screenshots deiner App einfügen)*

---

## Lizenz

MIT

---

## Mitwirken

Pull Requests und Issues sind willkommen!  
