# Anleitung zum Testen des Backends

Diese Anleitung beschreibt, wie Sie eine lokale Testumgebung für das Backend einrichten und die Integrationstests ausführen.

## Voraussetzungen

*   `bitcoind` und `bitcoin-cli` müssen installiert und im System-PATH verfügbar sein.
*   Das Rust-Toolset (`cargo`) muss installiert sein.
*   Das Projekt-Repository muss geklont sein.

## Schritt 1: Test-Konfiguration erstellen

Stellen Sie sicher, dass im Hauptverzeichnis des Projekts eine Datei namens `.env.test` existiert. Diese Datei wird *nur* für die Tests geladen.

**`.env.test`**
```bash
# Konfiguration NUR für die Backend-Integrationstests

# Diese Anmeldedaten müssen mit dem bitcoind-Startbefehl übereinstimmen.
RPC_USER=myuser
RPC_PASSWORD=mypass

# Host und Port für den regtest-Node
RPC_HOST=127.0.0.1
RPC_PORT=18443
```

## Schritt 2: Bitcoin Core im `regtest`-Modus starten

Der `regtest`-Modus ist ein privates, lokales Bitcoin-Netzwerk. Wählen Sie die Variante, die auf Ihr Setup zutrifft.

### Variante A: Lokal (bitcoind läuft auf demselben PC)

Dies ist der einfachste Fall.

1.  Öffnen Sie ein **neues, separates Terminalfenster**. Dieses Fenster muss während der gesamten Test-Session geöffnet bleiben.
2.  Führen Sie den folgenden Befehl aus:
    ```bash
    bitcoind -noconf -regtest -fallbackfee=0.0001 -txindex -rpcuser=myuser -rpcpassword=mypass
    ```
    *   `-noconf`: **WICHTIG:** Ignoriert die globale `bitcoin.conf`-Datei.
    *   `-regtest`: Startet den Node im privaten Test-Modus.
    *   `-txindex`: Erstellt einen Index aller Transaktionen, der für Tests benötigt wird.
    *   `-rpcuser` / `-rpcpassword`: Setzt die Anmeldedaten aus der `.env.test`.

### Variante B: Remote (bitcoind läuft auf einem Server via SSH)

Wenn `bitcoind` auf einem anderen Computer (z.B. einem Server) läuft, müssen Sie eine sichere SSH-Verbindung mit Port-Weiterleitung (Tunnel) aufbauen.

1.  Öffnen Sie ein **neues Terminalfenster auf Ihrem lokalen PC**.
2.  Bauen Sie den SSH-Tunnel auf. Dieser leitet Anfragen von Ihrem lokalen Port `18443` sicher zum Port `18443` auf dem Server weiter.
    ```bash
    ssh -L 18443:127.0.0.1:18443 user@ihr-server-ip
    ```
    *   `-L 18443:127.0.0.1:18443`: Leite Anfragen an meinen lokalen Port `18443` weiter an `127.0.0.1:18443` aus der Sicht des Servers.
    *   `user@ihr-server-ip`: Ersetzen Sie dies mit Ihren Server-Anmeldedaten.

3.  **Innerhalb dieses SSH-Terminals**, starten Sie nun `bitcoind`:
    ```bash
    bitcoind -noconf -regtest -fallbackfee=0.0001 -txindex -rpcuser=myuser -rpcpassword=mypass
    ```
4.  Lassen Sie dieses SSH-Terminal für die gesamte Test-Session geöffnet.

Unabhängig von der gewählten Variante läuft der Test-Node nun und wartet auf Verbindungen. Warten Sie, bis die Log-Meldung `init message: Done loading` erscheint.

## Schritt 3: Tests ausführen

Öffnen Sie ein **weiteres Terminalfenster** im Hauptverzeichnis des Projekts.

Führen Sie den Test-Befehl aus:

```bash
cargo test -- --test-threads=1
```

*   `-- --test-threads=1`: **WICHTIG:** Dieser Parameter ist entscheidend. Er weist Cargo an, die Tests nacheinander (seriell) statt parallel auszuführen. Da jeder Test eine eigene, temporäre Wallet im `regtest`-Node anlegt und finanziert, verhindert dies Race Conditions und "Flaky Tests", die durch gleichzeitige Initialisierungen entstehen würden.

Alle Tests sollten nun erfolgreich durchlaufen.

## Anhang: Tipps zur Fehlerbehebung (Unser Workflow)

Wenn die Tests fehlschlagen, insbesondere mit Verbindungsfehlern (`Connection refused`, `401 Unauthorized` oder Timeouts), hilft der folgende "Zwei-Terminal-Workflow" bei der systematischen Fehlersuche.

### Terminal A: Der Server (lokal oder via SSH)

Dieses Terminal ist ausschließlich für den `bitcoind`-Prozess reserviert. Hier starten Sie den Server und beobachten seine Log-Ausgaben.

1.  **Server starten:** Starten Sie `bitcoind` wie in **Schritt 2** (Variante A oder B) beschrieben.
2.  **Beobachten:** Warten Sie auf `init message: Done loading` und lassen Sie dieses Fenster offen.

### Terminal B: Der Client (Ihr lokaler PC)

Dieses Terminal ist Ihr "Test-Cockpit". Von hier aus prüfen Sie die Verbindung und starten die Tests.

1.  **Manuelle Verbindung prüfen:** Bevor Sie `cargo test` ausführen, senden Sie einen einfachen Befehl mit `bitcoin-cli`. Dies ist der schnellste Weg, um zu sehen, ob die Verbindung und die Zugangsdaten funktionieren.
    ```bash
    bitcoin-cli -noconf -regtest -rpcuser=myuser -rpcpassword=mypass getblockchaininfo
    ```
    *   **Wenn dieser Befehl erfolgreich ist,** wissen Sie, dass die Netzwerkverbindung steht. Das Problem liegt dann im Rust-Code oder der Test-Konfiguration.
    *   **Wenn dieser Befehl fehlschlägt,** liegt das Problem außerhalb Ihres Rust-Projekts (Server läuft nicht, Tunnel falsch, Tippfehler im Passwort etc.).

2.  **Rust-Tests ausführen:** Erst wenn der manuelle Test erfolgreich war, führen Sie die vollständige Test-Suite aus.
    ```bash
    # Ggf. mit geleerten Proxy-Variablen, falls Sie in einem Netzwerk mit Proxy sind
    HTTP_PROXY="" HTTPS_PROXY="" cargo test -- --test-threads=1
    ```

Dieser systematische Ansatz trennt Netzwerkprobleme von Code-Problemen und macht die Fehlersuche wesentlich effizienter.

## Schritt 4: Aufräumen

Wenn Sie mit dem Testen fertig sind:
1.  Schließen Sie das `cargo test`-Terminal.
2.  Gehen Sie zum `bitcoind`-Terminal und beenden Sie den Prozess mit `Strg + C`.

Ihr System ist nun wieder im ursprünglichen Zustand.

## Schritt 5: Normalen Node-Betrieb wieder aufnehmen

Nachdem Sie den `regtest`-Node beendet haben, können Sie Ihren regulären Bitcoin-Node (in Ihrem Fall für Signet) wieder starten.

Da die Konfiguration dafür in Ihrer `~/.bitcoin/bitcoin.conf`-Datei gespeichert ist, ist der Startbefehl sehr einfach.

1.  **Node als Hintergrundprozess starten:**
    ```bash
    bitcoind -daemon
    ```
    *   Dieser Befehl startet `bitcoind` im Hintergrund (`-daemon`) und lädt automatisch Ihre Standard-Konfiguration.

2.  **Status überprüfen:** Nach ein paar Sekunden können Sie überprüfen, ob Ihr Signet-Node korrekt läuft:
    ```bash
    bitcoin-cli -signet getblockchaininfo
    ```
    *   Wir verwenden hier `-signet`, da dies die Konfiguration in Ihrer `bitcoin.conf` ist.

Ihr normaler Node läuft nun wieder wie gewohnt.