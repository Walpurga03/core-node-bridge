export const blockchainCommands = {
    "dumptxoutset": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "path",
            "type": "string",
            "required": true,
            "desc": "Pfad zur Ausgabedatei (relativ zum Bitcoin-Datenverzeichnis, falls nicht absolut).",
            "placeholder": "z.B. utxo.dat",
            "hint": "Dateiname oder Pfad, in den das UTXO-Set geschrieben wird."
          },
          {
            "name": "type",
            "type": "string",
            "required": false,
            "desc": "Typ des Snapshots (optional).",
            "placeholder": "latest | rollback",
            "hint": "\"latest\" für aktuellen UTXO-Snapshot, \"rollback\" für historischen Stand."
          },
          {
            "name": "rollback_block",
            "type": "string|number",
            "required": false,
            "desc": "Blockhöhe oder Blockhash für Rollback (optional, nur bei type=rollback).",
            "placeholder": "z.B. 853456 oder Blockhash",
            "hint": "Optional: Höhe oder Hash des Blocks, zu dem zurückgerollt werden soll."
          }
        ],
        "rpcVersion": "22.0.0",
        "complexity": "high"
      },
      "title": "UTXO-Set exportieren",
      "short": "Exportiert das aktuelle oder ein historisches UTXO-Set als Snapshot-Datei.",
      "examples": [
        "dumptxoutset utxo.dat",
        "dumptxoutset utxo.dat latest",
        "dumptxoutset utxo.dat rollback 853456"
      ],
      "details": "### Was ist `dumptxoutset`?\n\nMit diesem Befehl kannst du den aktuellen Zustand des UTXO-Sets (alle nicht ausgegebenen Coins) deines Bitcoin Core Nodes in eine Datei exportieren. Das ist nützlich für Backups, Analysen oder um Snapshots auf anderen Nodes zu laden (`loadtxoutset`).\n\n### Parameter\n1. `path` (String, **erforderlich**): Pfad zur Ausgabedatei. Relativ zum Bitcoin-Datenverzeichnis, falls nicht absolut.\n2. `type` (String, optional): \"latest\" für aktuellen Snapshot, \"rollback\" für einen historischen Stand.\n3. `rollback_block` (String|Number, optional): Höhe oder Hash des Blocks, zu dem zurückgerollt werden soll (nur bei type=rollback).\n\n### Was ist das Ergebnis?\n\nEin JSON-Objekt mit Infos zum Snapshot:\n- `coins_written`: Anzahl der geschriebenen Coins\n- `base_hash`: Hash des Basis-Blocks\n- `base_height`: Höhe des Basis-Blocks\n- `path`: Absoluter Pfad zur Snapshot-Datei\n- `txoutset_hash`: Hash des UTXO-Set-Inhalts\n- `nchaintx`: Anzahl Transaktionen bis inkl. Basisblock\n\n### Wichtige Hinweise\n- Während des Snapshots wird der Node ggf. zurückgerollt und Netzwerkaktivität pausiert. Keine weiteren RPCs währenddessen ausführen!\n- Der Vorgang kann mehrere Minuten dauern. Setze ggf. `-rpcclienttimeout=0`.\n- Snapshots können später mit `loadtxoutset` geladen werden, sofern die Chain-Parameter dies erlauben.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli -rpcclienttimeout=0 dumptxoutset utxo.dat latest\nbitcoin-cli -rpcclienttimeout=0 dumptxoutset utxo.dat rollback 853456\n```"
    },
    "getbestblockhash": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.1.0",
        "complexity": "low"
      },
      "title": "Besten Block-Hash abrufen",
      "short": "Zeigt den Hash des neuesten Blocks (Spitzenblock) der aktuellen Blockchain.",
      "examples": [
        "getbestblockhash"
      ],
      "details": "### Was ist `getbestblockhash`?\n\nDer Befehl `getbestblockhash` liefert dir den eindeutigen \"Fingerabdruck\" – den Hash – des aktuellsten Blocks an der Spitze der gültigen Blockchain. Dieser Block wird oft als \"Chain Tip\" oder \"Spitzenblock\" bezeichnet.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n*   **Den neuesten Block eindeutig kennenlernen:** Du erhältst die exakte Kennung des Blocks, der gerade als letzter zur Kette hinzugefügt wurde.\n*   **Details zum neuesten Block abfragen:** Der erhaltene Hash ist wie eine Adresse. Du kannst ihn in anderen Befehlen (z.B. `getblock`) verwenden, um alle Details dieses neuesten Blocks zu erfahren.\n*   **Überprüfen, ob dein Node aktuell ist:** Indem du den Hash deines besten Blocks mit dem von anderen vertrauenswürdigen Quellen (wie Block-Explorern) vergleichst, kannst du sicherstellen, dass dein Node die aktuellste Version der Blockchain sieht.\n\n### Was ist das Ergebnis?\n\nDer Befehl gibt eine Zeichenkette (einen String) zurück. Diese Zeichenkette ist der 64 Zeichen lange, hexadezimal kodierte Hash des neuesten Blocks.\n\n```json\n\"0000000000000000000aabbccddeeff00112233445566778899aabbccddeeff\"\n```\n\n### Wichtige Hinweise\n*   **Schnell und effizient:** Dieser Befehl belastet deinen Node kaum und liefert das Ergebnis sehr zügig.\n*   **Der \"beste\" Block:** Dies bezieht sich auf den Block an der Spitze der Kette, die die meiste Rechenarbeit (Proof-of-Work) aufweist und somit als die aktuell gültige Hauptkette gilt.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getbestblockhash\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getbestblockhash\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getblock": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhash",
            "type": "string",
            "required": true,
            "desc": "Der Hash des Blocks, der abgerufen werden soll.",
            "placeholder": "z.B. 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
            "hint": "Gib einen gültigen Block-Hash ein (64 hexadezimale Zeichen).",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash muss genau 64 hexadezimale Zeichen enthalten."
            }
          },
          {
            "name": "verbosity",
            "type": "number",
            "required": false,
            "default": 1,
            "desc": "Detailgrad der Ausgabe. 0 für hex-kodierten Block, 1 für JSON-Objekt mit Transaktions-IDs, 2 für JSON-Objekt mit vollständigen Transaktionen.",
            "hint": "Wähle den Detailgrad (0, 1 oder 2). Standard ist 1.",
            "options": [
              {
                "value": 0,
                "label": "0 - Hex-kodierter Block",
                "desc": "Gibt den Block als serialisierte, hexadezimal kodierte Zeichenkette zurück."
              },
              {
                "value": 1,
                "label": "1 - Block-Info mit TXIDs (Standard)",
                "desc": "Gibt ein JSON-Objekt mit Blockinformationen und Transaktions-IDs zurück."
              },
              {
                "value": 2,
                "label": "2 - Block-Info mit vollständigen Transaktionen",
                "desc": "Gibt ein JSON-Objekt mit Blockinformationen und vollständigen Transaktionsdaten zurück."
              }
            ],
            "validation": {
              "min": 0,
              "max": 2,
              "errorMessage": "Verbosity muss 0, 1 oder 2 sein."
            }
          }
        ],
        "rpcVersion": "0.6.0",
        "complexity": "medium"
      },
      "title": "Block-Informationen abrufen",
      "short": "Ruft detaillierte Informationen zu einem Block ab, identifiziert durch seinen Hash.",
      "examples": [
        "getblock 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
        "getblock 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f 1",
        "getblock 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f 2"
      ],
      "details": "### Was ist `getblock`?\n\nMit dem Befehl `getblock` (verfügbar seit Bitcoin Core 0.6) kannst du dir detaillierte Informationen zu einem ganz bestimmten Block aus der Blockchain anzeigen lassen. Stell dir vor, jeder Block ist eine Seite in einem riesigen Buch, und mit `getblock` kannst du eine beliebige Seite aufschlagen und lesen, vorausgesetzt, du kennst ihre eindeutige Kennung (ihren Hash).\n\nDie Menge an Details, die du erhältst, kannst du über einen optionalen Parameter namens `verbosity` steuern.\n\n### Parameter\n1.  `blockhash` (String, **erforderlich**): Dies ist der eindeutige \"Fingerabdruck\" (Hash) des Blocks, den du untersuchen möchtest. Er besteht aus 64 hexadezimalen Zeichen.\n    *   *Beispiel:* `000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`\n2.  `verbosity` (Zahl, optional, Standardwert: `1`): Dieser Parameter bestimmt, wie detailliert die Informationen zum Block sein sollen.\n    *   `0`: Du erhältst den Block in einem rohen, hexadezimal kodierten Format. Das ist meist nur für tiefgehende technische Analysen nützlich.\n    *   `1` (Standard): Du bekommst eine gut lesbare JSON-Struktur mit allgemeinen Informationen über den Block (wie Höhe, Zeitstempel, Schwierigkeit) und den IDs (Hashes) aller Transaktionen, die in diesem Block enthalten sind.\n    *   `2`: Ähnlich wie bei `1`, aber zusätzlich zu den Transaktions-IDs werden auch die vollständigen Details jeder einzelnen Transaktion im Block angezeigt (einschließlich aller Inputs und Outputs). Dies kann eine sehr große Datenmenge sein!\n\n### Was ist das Ergebnis?\n\nDas Ergebnis hängt vom gewählten `verbosity`-Level ab:\n\n**Bei `verbosity = 0`:**\nEine einzelne, lange Zeichenkette, die den gesamten Block in serialisierter, hexadezimaler Form darstellt.\n```\n\"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c0101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000\"\n// (String) Der serialisierte Block, hexadezimal kodiert\n```\n\n**Bei `verbosity = 1` (Standard):**\nEin JSON-Objekt mit Blockinformationen und einer Liste der Transaktions-IDs (TXIDs).\n```json\n{\n  \"hash\": \"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f\",\n  \"confirmations\": 654321,\n  \"height\": 123456,\n  \"version\": 1,\n  \"merkleroot\": \"0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098\",\n  \"tx\": [\n    \"0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098\"\n    // ... weitere Transaktions-IDs\n  ],\n  \"time\": 1231006505,\n  \"nonce\": 2083236893,\n  \"difficulty\": 1,\n  // ... und viele weitere Felder\n}\n```\n\n**Bei `verbosity = 2`:**\nEin JSON-Objekt, ähnlich wie bei `verbosity = 1`, aber die `tx`-Liste enthält die vollständigen Details jeder Transaktion.\n```json\n{\n  \"hash\": \"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f\",\n  // ... gleiche Felder wie bei verbosity = 1 ...\n  \"tx\": [\n    {\n      \"txid\": \"0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098\",\n      \"version\": 1,\n      \"vin\": [ /* ... Inputs ... */ ],\n      \"vout\": [ /* ... Outputs ... */ ],\n      \"hex\": \"01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000\" // Vollständige Transaktion hex-kodiert\n    }\n    // ... weitere vollständige Transaktionen\n  ],\n  // ... und viele weitere Felder\n}\n```\n\n### Wichtige Hinweise\n*   Der angegebene `blockhash` muss ein gültiger Hash eines Blocks sein, den dein Node kennt und gespeichert hat.\n*   Die genauen Felder im Ergebnis können je nach Blockinhalt und der Version deines Bitcoin Core Nodes leicht variieren.\n*   Sei vorsichtig mit `verbosity = 2` bei Blöcken mit sehr vielen Transaktionen, da die ausgegebene Datenmenge sehr groß werden kann.\n\n### Beispiele für die Kommandozeile\n```bash\n# Standard Detailgrad (verbosity 1)\nbitcoin-cli getblock \"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f\"\n\n# Nur hex-kodierter Block (verbosity 0)\nbitcoin-cli getblock \"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f\" 0\n\n# Block mit vollständigen Transaktionsdaten (verbosity 2)\nbitcoin-cli getblock \"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f\" 2\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"getblock\", \"params\": [\"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f\", 1]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/\n```"
    },
    "getblockchaininfo": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.9.0",
        "complexity": "low"
      },
      "title": "Blockchain-Informationen abrufen",
      "short": "Zeigt allgemeine Informationen zur aktuellen Blockchain, z.B. Blockhöhe, Chain, Pruning-Status und mehr.",
      "examples": [
        "getblockchaininfo"
      ],
      "details": "### Was ist `getblockchaininfo`?\n\nStell dir `getblockchaininfo` als ein umfassendes Dashboard für deinen Bitcoin Core Node vor. Dieser Befehl gibt dir einen detaillierten Überblick über den aktuellen Zustand deines Nodes und seine Verbindung zur Bitcoin-Blockchain. Er ist besonders nützlich, um schnell zu verstehen, wie dein Node arbeitet und ob alles nach Plan läuft.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\nMit `getblockchaininfo` kannst du wichtige Fragen zu deinem Node beantworten, zum Beispiel:\n\n*   **Netzwerk-Zugehörigkeit:** Auf welchem Bitcoin-Netzwerk ist mein Node aktiv? (z.B. das Hauptnetzwerk \"mainnet\", ein Testnetzwerk wie \"testnet\" oder \"signet\", oder ein lokales \"regtest\")\n*   **Synchronisationsstatus:** Wie aktuell ist mein Node? Hat er bereits alle Blöcke der Blockchain heruntergeladen und verarbeitet (aktuelle Blockhöhe)? Befindet er sich noch im initialen Download-Prozess?\n*   **Speicherplatzbedarf:** Wie viel Speicherplatz belegt die Blockchain auf meiner Festplatte? Nutzt mein Node \"Pruning\", eine Technik, um Speicherplatz zu sparen, indem ältere Blöcke gelöscht werden?\n*   **Aktuelle Mining-Schwierigkeit:** Wie schwierig ist es momentan für Miner, neue Blöcke zu finden und damit neue Bitcoins zu erzeugen? Dies gibt einen Einblick in die Sicherheit und Aktivität des Netzwerks.\n*   **Netzwerk-Warnungen:** Gibt es wichtige Warnmeldungen oder Hinweise vom Bitcoin-Netzwerk, die ich beachten sollte?\n*   **Allgemeine Blockchain-Daten:** Du erhältst auch Informationen wie den Hash des aktuellsten Blocks (wichtig zur Überprüfung der Kettenintegrität) und die mediane Zeit der letzten Blöcke.\n\nKurz gesagt, `getblockchaininfo` ist ein grundlegendes Werkzeug, um die Gesundheit, Konfiguration und den Synchronisationsfortschritt deines Bitcoin Core Nodes zu überwachen und zu verstehen.\n\n### Wichtige Hinweise\n*   Die genaue Menge und Art der angezeigten Informationen kann je nach Version deines Bitcoin Core Nodes und dessen Konfiguration (z.B. aktiviertes Pruning) leicht variieren.\n*   Bei aktiviertem Pruning können zusätzliche Informationen zum Pruning-Status angezeigt werden.\n*   Bestimmte Felder sind nur relevant, wenn der Node auf speziellen Netzwerken wie \"Signet\" läuft.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getblockchaininfo\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockchaininfo\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getblockcount": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.1.0",
        "complexity": "low"
      },
      "title": "Blockanzahl abrufen",
      "short": "Zeigt die aktuelle Blockhöhe der Blockchain an (Anzahl aller Blöcke ab Genesis-Block 0).",
      "examples": [
        "getblockcount"
      ],
      "details": "### Was ist `getblockcount`?\n\n`getblockcount` ist ein einfacher, aber fundamentaler Befehl in Bitcoin Core (verfügbar seit Version 0.1). Er teilt dir mit, wie viele Blöcke sich in der aktuell längsten und am meisten bestätigten Version der Blockchain befinden. Stell dir vor, du fragst nach der Gesamtzahl der Seiten in einem ständig wachsenden Buch – `getblockcount` gibt dir diese Seitenzahl für die Blockchain. Die Zählung beginnt mit dem allerersten Block, dem sogenannten Genesis-Block, der die Höhe 0 hat.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Schnelle Synchronisationsprüfung:** Ist mein Bitcoin-Node auf dem neuesten Stand? Ein Vergleich der Ausgabe von `getblockcount` mit der aktuellen Blockhöhe, die von Block-Explorern im Internet angezeigt wird, gibt dir eine schnelle Antwort.\n*   **Grundlage für weitere Erkundungen:** Die Blockhöhe ist oft ein Ausgangspunkt für andere Befehle. Wenn du zum Beispiel Details zu einem bestimmten Block wissen möchtest, benötigst du oft dessen Höhe.\n*   **Automatisierung und Überwachung:** Entwickler nutzen diesen Befehl in Skripten oder Monitoring-Systemen, um den Synchronisationsfortschritt eines Nodes automatisch zu verfolgen oder um auf neue Blöcke zu reagieren.\n\n### Was ist das Ergebnis?\n\nDer Befehl gibt eine einzelne Zahl zurück. Diese Zahl ist die aktuelle Blockhöhe.\n\n```\n1234567   // Beispiel: Die aktuelle Blockhöhe ist 1.234.567\n```\n\n### Wichtige Hinweise\n*   **Effizient:** Der Befehl benötigt kaum Rechenleistung und liefert das Ergebnis sehr schnell.\n*   **Längste Kette:** Die angezeigte Höhe bezieht sich immer auf die Blockchain-Version, die die meiste Rechenarbeit (Proof-of-Work) repräsentiert und daher als die gültige Hauptkette angesehen wird.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getblockcount\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockcount\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getblockfilter": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhash",
            "type": "string",
            "required": true,
            "desc": "Der Block-Hash",
            "placeholder": "z.B. 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
            "hint": "Gib einen gültigen Block-Hash (64 Hex-Zeichen) ein",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash muss genau 64 Hexadezimalzeichen haben"
            }
          },
          {
            "name": "filtertype",
            "type": "string",
            "required": false,
            "default": "basic",
            "desc": "Filtertyp (optional)",
            "placeholder": "z.B. basic",
            "hint": "Der Name des Filters (z.B. 'basic')",
            "options": [
              { "value": "basic", "label": "basic", "desc": "Standard BIP157 Blockfilter" }
            ]
          }
        ],
        "rpcVersion": "0.19.0",
        "complexity": "medium"
      },
      "title": "Blockfilter abrufen",
      "short": "Liefert einen BIP 157 Blockfilter für einen bestimmten Block.",
      "examples": [
        "getblockfilter 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
        "getblockfilter 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f basic"
      ],
      "details": "### Was ist `getblockfilter`?\n\nDer Befehl `getblockfilter` (verfügbar seit Bitcoin Core 0.19) ist ein Werkzeug für sogenannte \"Lightweight Clients\" (wie manche Mobile Wallets). Er liefert einen speziellen, kompakten Filter für einen bestimmten Block, bekannt als BIP 157/158 Blockfilter. Stell dir diesen Filter wie ein Inhaltsverzeichnis für einen Block vor, das aber nicht alle Details verrät, sondern nur, ob *möglicherweise* für dich relevante Transaktionen enthalten sind.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Effizientere Wallet-Synchronisation:** Anstatt jeden einzelnen Block komplett herunterladen zu müssen, können Light-Wallets diese Filter abrufen. Nur wenn ein Filter anzeigt, dass ein Block relevante Transaktionen enthalten *könnte*, wird der vollständige Block geladen. Das spart enorm viel Bandbreite und Zeit.\n*   **Verbesserter Datenschutz:** Wallets müssen nicht alle ihre Adressen an einen Full Node senden, um nach Transaktionen zu suchen. Sie können die Filter lokal prüfen.\n*   **Weniger Datenverbrauch:** Die Filter sind viel kleiner als die vollständigen Blöcke.\n\n### Parameter\n1.  `blockhash` (String, **erforderlich**): Der Hash des Blocks, für den der Filter abgerufen werden soll (64 hexadezimale Zeichen).\n2.  `filtertype` (String, optional, Standardwert: `\"basic\"`): Der Typ des Filters. Bitcoin Core unterstützt standardmäßig `\"basic\"`, was dem in BIP 158 definierten Filter entspricht.\n\n### Was ist das Ergebnis?\n\nDu erhältst ein JSON-Objekt mit zwei Hauptinformationen:\n\n```json\n{\n  \"filter\": \"<hex_kodierter_filter_string>\",   // (String) Der eigentliche Filter, als hexadezimale Zeichenkette.\n  \"header\": \"<hex_kodierter_header_string>\"    // (String) Ein zugehöriger Filter-Header, der den Filter kryptographisch mit dem Blockheader verbindet.\n}\n```\n\n### Wichtige Hinweise\n*   **Node-Konfiguration:** Dein Bitcoin Core Node muss mit der Option `blockfilterindex=1` gestartet worden sein, damit dieser Befehl funktioniert und Filter bereitgestellt werden.\n*   **Filtertyp `\"basic\"`:** Dies ist der Standard und bezieht sich auf die in BIP 157/158 spezifizierten Filter.\n*   **Fehler:** Wenn du einen ungültigen `blockhash` angibst oder für den Block kein Filterindex existiert, gibt der Node einen Fehler zurück.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getblockfilter \"00000000000000000001052307234e9b45956087733f6d62f25b1de3843cab44\"\n```\n```bash\nbitcoin-cli getblockfilter \"00000000000000000001052307234e9b45956087733f6d62f25b1de3843cab44\" \"basic\"\n```"
    },
    "getblockfrompeer": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhash",
            "type": "string",
            "required": true,
            "desc": "Der Hash des Blocks, der vom Peer angefordert werden soll.",
            "placeholder": "z.B. 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
            "hint": "Gib einen gültigen Block-Hash (64 hexadezimale Zeichen) ein.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash muss genau 64 hexadezimale Zeichen enthalten."
            }
          },
          {
            "name": "peer_id",
            "type": "number",
            "required": true,
            "desc": "Die Peer-ID, von der der Block angefordert werden soll (siehe getpeerinfo).",
            "placeholder": "z.B. 0",
            "hint": "Peer-ID aus getpeerinfo verwenden."
          }
        ],
        "rpcVersion": "22.0.0",
        "complexity": "medium"
      },
      "title": "Block von Peer anfordern",
      "short": "Fordert einen Block gezielt von einem bestimmten Peer an.",
      "examples": [
        "getblockfrompeer 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09 0"
      ],
       "details": "### Was ist `getblockfrompeer`?\n\nMit diesem Befehl kannst du gezielt einen bestimmten Block von einem bestimmten Peer im Netzwerk anfordern. Das ist besonders für fortgeschrittene Nutzer und Debugging-Szenarien relevant, wenn du z.B. einen Block von einem bestimmten Peer erneut laden möchtest oder Netzwerkprobleme analysierst.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\nAnders als die meisten RPCs, die Daten aus der lokalen Blockchain liefern, zwingt `getblockfrompeer` deinen Node, einen bestimmten Block aktiv von einem bestimmten Peer im Netzwerk anzufordern. Das ist nützlich, wenn:\n*   Du gezielt testen möchtest, ob ein Peer einen bestimmten Block liefern kann.\n*   Du Debugging betreibst und wissen willst, wie dein Node auf Netzwerkprobleme oder fehlende Blöcke reagiert.\n*   Du einen Block von einem Peer holen willst, der z.B. eine andere Kette verfolgt.\n\n### Parameter\n1. `blockhash` (String, **erforderlich**): Der Hash des Blocks, der angefordert werden soll.\n2. `peer_id` (Number, **erforderlich**): Die Peer-ID, von der der Block angefordert werden soll (siehe `getpeerinfo`).\n\n### Was ist das Ergebnis?\n\nEin leeres JSON-Objekt `{}` bei erfolgreicher Planung der Anfrage.\n\n### Wichtige Hinweise\n- Der Node muss den Header des Blocks bereits kennen (z.B. durch `submitheader`).\n- Der Block enthält keine Undo-Daten und kann daher nicht in allen Kontexten verwendet werden.\n- Wiederholte Anfragen für denselben Block können dazu führen, dass frühere Antworten ignoriert werden.\n- Peers ignorieren Anfragen für sehr alte oder nie vollständig verifizierte Blöcke.\n- Wenn ein Peer nicht antwortet, wird die Verbindung getrennt.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getblockfrompeer \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\" 0\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockfrompeer\", \"params\": [\"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\", 0]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getblockhash": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "height",
            "type": "number",
            "required": true,
            "desc": "Block-Höhe",
            "placeholder": "z.B. 100000",
            "hint": "Gib eine gültige Block-Höhe ein (0 oder höher)",
            "validation": {
              "min": 0,
              "max": 999999999,
              "errorMessage": "Block-Höhe muss 0 oder höher sein"
            }
          }
        ],
        "rpcVersion": "0.6.0",
        "complexity": "low"
      },
      "title": "Block-Hash abrufen",
      "short": "Gibt den Block-Hash für eine bestimmte Block-Höhe zurück.",
      "examples": [
        "getblockhash 100000",
        "getblockhash 0"
      ],
      "details": "### Was ist `getblockhash`?\n\nDer Befehl `getblockhash` (verfügbar seit Bitcoin Core 0.6) ist wie ein Wegweiser in der Blockchain. Wenn du die \"Hausnummer\" eines Blocks kennst – also seine Höhe (Position) in der Kette – liefert dir dieser Befehl seinen eindeutigen \"Fingerabdruck\" (Hash).\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Den Hash zu einer Blockhöhe finden:** Du weißt, der wievielte Block dich interessiert (z.B. Block Nummer 100.000), und möchtest seine eindeutige Kennung (Hash) erfahren. Diesen Hash benötigst du oft für andere Befehle, wie z.B. `getblock`, um Details zum Block abzurufen.\n*   **Automatisierte Prozesse:** In Skripten kannst du so gezielt auf Blöcke bestimmter Höhen zugreifen.\n*   **Daten abgleichen:** Du kannst überprüfen, ob der Block an einer bestimmten Höhe auf deinem Node derselbe ist, den z.B. ein öffentlicher Block-Explorer anzeigt.\n\n### Parameter\n1.  `height` (Zahl, **erforderlich**): Die Höhe (Nummer) des Blocks in der Blockchain, dessen Hash du abrufen möchtest. Der allererste Block (Genesis-Block) hat die Höhe 0.\n\n### Was ist das Ergebnis?\n\nDer Befehl gibt eine Zeichenkette (einen String) zurück. Diese Zeichenkette ist der 64 Zeichen lange, hexadezimal kodierte Hash des Blocks an der angegebenen Höhe.\n\n```\n\"00000000000000b7a209f1c4f650f0a2f3f9a0a9cda6f8c0e0f8a0a9cda6f8c0\" // Beispiel für einen Block-Hash\n```\n\n### Wichtige Hinweise\n*   **Gültige Höhe:** Die angegebene Blockhöhe muss existieren und deinem Node bekannt sein. Wenn du eine Höhe angibst, die (noch) nicht existiert oder ungültig ist, erhältst du eine Fehlermeldung.\n*   **Zählung ab Null:** Denk daran, dass der erste Block der Blockchain (Genesis-Block) die Höhe 0 hat.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getblockhash 100000\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockhash\", \"params\": [100000]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getblockheader": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhash",
            "type": "string",
            "required": true,
            "desc": "Der Hash des Blocks, dessen Header abgerufen werden soll.",
            "placeholder": "z.B. 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
            "hint": "Gib einen gültigen Block-Hash (64 hexadezimale Zeichen) ein.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash muss genau 64 hexadezimale Zeichen enthalten."
            }
          },
          {
            "name": "verbose",
            "type": "boolean",
            "required": false,
            "default": true,
            "desc": "true für ein JSON-Objekt, false für hex-kodierte Rohdaten.",
            "hint": "Optional: true (Standard) für strukturierte Ausgabe, false für hex-kodierte Daten."
          }
        ],
        "rpcVersion": "0.12.0",
        "complexity": "low"
      },
      "title": "Block-Header abrufen",
      "short": "Liefert Informationen zum Header eines bestimmten Blocks.",
      "examples": [
        "getblockheader 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
        "getblockheader 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09 false"
      ],
      "details": "### Was ist `getblockheader`?\n\nMit diesem Befehl kannst du gezielt den Header eines bestimmten Blocks aus der Blockchain abrufen. Der Blockheader enthält die wichtigsten Metadaten eines Blocks (z.B. Zeitstempel, Schwierigkeit, Nonce), aber nicht die Liste der Transaktionen. Das macht ihn sehr kompakt und schnell abrufbar.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n*   **Block-Metadaten anzeigen:** Du erhältst alle wichtigen Felder des Blockheaders, wie Zeitstempel, Merkle-Root, Nonce, Schwierigkeit, sowie den Hash des vorherigen und (falls bekannt) nächsten Blocks.\n*   **Effiziente Blockchain-Prüfung:** Für viele Anwendungen (wie Lightweight Clients) reicht es, nur die Header zu prüfen, um die Integrität der Kette zu verifizieren (Simplified Payment Verification - SPV).\n*   **Vergleich und Analyse:** Prüfe, ob ein Block zur Hauptkette gehört und wie viele Bestätigungen er hat.\n*   **Rohdaten für Experten:** Mit `verbose=false` erhältst du den Header als hex-kodierte Rohdaten für tiefergehende technische Analysen oder eigene Tools.\n\n### Parameter\n1. `blockhash` (String, **erforderlich**): Der Hash des Blocks, dessen Header du abrufen möchtest.\n2. `verbose` (Boolean, optional, Standard: `true`): `true` für ein JSON-Objekt mit allen Feldern, `false` für hex-kodierte Rohdaten.\n\n### Was ist das Ergebnis?\n\n- **Bei `verbose=true` (Standard):** Ein JSON-Objekt mit Feldern wie `hash`, `confirmations`, `height`, `version`, `merkleroot`, `time`, `difficulty`, `previousblockhash`, `nextblockhash` usw.\n```json\n{\n  \"hash\": \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\",\n  \"confirmations\": 12345,\n  \"height\": 123456,\n  \"version\": 536870912,\n  \"merkleroot\": \"...\",\n  \"time\": 1386325540,\n  \"mediantime\": 1386325530,\n  \"nonce\": 2595206198,\n  \"bits\": \"181d44c6\",\n  \"difficulty\": 1180923195.258026,\n  \"chainwork\": \"...\",\n  \"nTx\": 23,\n  \"previousblockhash\": \"...\",\n  \"nextblockhash\": \"...\"\n}\n```\n- **Bei `verbose=false`:** Eine hexadezimale Zeichenkette mit den 80-Byte Rohdaten des Blockheaders.\n```\n\"010000004dd9...\"\n```\n\n### Beispiele für die Kommandozeile\n```bash\n# JSON-formatierte Ausgabe\nbitcoin-cli getblockheader \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\"\n\n# Hex-kodierte Rohdaten\nbitcoin-cli getblockheader \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\" false\n```\n```bash\n# Beispiel mit curl\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockheader\", \"params\": [\"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getblockstats": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "hash_or_height",
            "type": "string|number",
            "required": true,
            "desc": "Block-Hash (64 Zeichen) oder Blockhöhe (Zahl)",
            "placeholder": "z.B. 100000 oder 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
            "hint": "Gib entweder die Blockhöhe oder den Block-Hash an."
          },
        {
          "name": "stats",
          "type": "array",
          "required": false,
          "desc": "Liste der gewünschten Statistiken (optional, Standard: alle)",
          "placeholder": "[\"minfeerate\",\"avgfeerate\"]",
          "hint": "Optional: Liste der Felder, die berechnet werden sollen.",
        }
        ],
        "rpcVersion": "0.17.0",
        "complexity": "medium"
      },
      "title": "Blockstatistiken abrufen",
      "short": "Berechnet Statistiken für einen bestimmten Block (nach Hash oder Höhe).",
      "examples": [
        "getblockstats 1000",
        "getblockstats 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09 '[\"minfeerate\",\"avgfeerate\"]'"
      ],
      "details": "### Was ist `getblockstats`?\n\nMit diesem Befehl kannst du detaillierte Statistiken für einen bestimmten Block berechnen lassen – entweder durch Angabe des Block-Hashs oder der Blockhöhe. Die Statistiken umfassen u.a. durchschnittliche und maximale Gebühren, Transaktionsgrößen, SegWit-Anteile, UTXO-Änderungen und vieles mehr. Alle Beträge werden in Satoshis angegeben.\n\n### Parameter\n1. `hash_or_height` (String|Number, **erforderlich**): Der Block-Hash (64 Zeichen) oder die Blockhöhe (Zahl).\n2. `stats` (Array, optional): Ein Array mit den gewünschten Statistik-Namen (z.B. `[\"minfeerate\",\"avgfeerate\"]`). Wird kein Array angegeben, werden alle verfügbaren Werte berechnet.\n\n### Was ist das Ergebnis?\n\nEin JSON-Objekt mit den angeforderten Statistiken, z.B.:\n```json\n{\n  \"avgfee\": 1234,\n  \"avgfeerate\": 12,\n  \"avgtxsize\": 250,\n  \"blockhash\": \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\",\n  \"feerate_percentiles\": [1, 2, 3, 4, 5],\n  \"height\": 1000,\n  \"ins\": 500,\n  \"maxfee\": 50000,\n  \"maxfeerate\": 100,\n  \"maxtxsize\": 99999,\n  \"medianfee\": 1000,\n  \"mediantime\": 1386325540,\n  \"mediantxsize\": 200,\n  \"minfee\": 100,\n  \"minfeerate\": 1,\n  \"mintxsize\": 100,\n  \"outs\": 450,\n  \"subsidy\": 2500000000,\n  \"swtotal_size\": 800000,\n  \"swtotal_weight\": 3200000,\n  \"swtxs\": 150,\n  \"time\": 1386325540,\n  \"total_out\": 2501234567,\n  \"total_size\": 999999,\n  \"total_weight\": 3999996,\n  \"totalfee\": 1234567,\n  \"txs\": 250,\n  \"utxo_increase\": -50,\n  \"utxo_size_inc\": -1000\n}\n```\n\n### Wichtige Hinweise\n- Funktioniert nicht für alle Blöcke, wenn dein Node Pruning aktiviert hat und der Block bereits entfernt wurde.\n- Die Werte beziehen sich immer auf den angegebenen Block, nicht auf ein Fenster mehrerer Blöcke.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getblockstats 1000\nbitcoin-cli getblockstats \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\" '[\"minfeerate\", \"avgfeerate\"]'\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockstats\", \"params\": [1000, [\"minfeerate\",\"avgfeerate\"]]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getchainstates": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "29.0.0",
        "complexity": "medium"
      },
      "title": "Blockketten-Zustände abrufen",
      "short": "Gibt Informationen über die verschiedenen Chainstates (alternative Blockketten-Zustände) zurück, die der Node verfolgt.",
      "examples": [
        "getchainstates"
      ],
      "details": "### Was ist `getchainstates`?\n\nDer Befehl `getchainstates` (verfügbar seit Bitcoin Core 29.0.0) gibt dir einen Einblick in die verschiedenen \"Zustände\" der Blockchain, die dein Node aktuell kennt und verwaltet. Normalerweise gibt es nur einen Hauptzustand (die längste Kette), aber in bestimmten Situationen, wie bei einem Netzwerk-Fork (wenn sich die Kette vorübergehend aufspaltet) oder bei der Verwendung von Snapshots (für ein schnelleres Aufsetzen eines Nodes), kann dein Node mehrere solcher Zustände gleichzeitig im Blick haben.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Netzwerk-Forks analysieren:** Verstehen, ob dein Node alternative Versionen der Blockchain sieht und wie deren Status ist (z.B. Länge, Schwierigkeit).\n*   **Snapshot-Nutzung überprüfen:** Wenn du Snapshots für ein schnelles Setup deines Nodes verwendest, zeigt dieser Befehl, auf welchem Snapshot ein Chainstate basiert und ob er bereits vollständig überprüft wurde.\n*   **Fortgeschrittenes Debugging und Monitoring:** Detaillierte Überwachung des Zustands und der Synchronisation verschiedener Chain-Tips, die dem Node bekannt sind.\n\n### Was ist das Ergebnis?\n\nDu erhältst ein JSON-Objekt, das eine Gesamtanzahl der bekannten Block-Header und eine Liste von Objekten enthält, die jeweils einen Chainstate beschreiben. Die Liste ist so sortiert, dass der Chainstate mit der meisten Arbeit (also die aktive, \"beste\" Kette) am Ende steht.\n\n```json\n{\n  \"headers\" : 1234567,               // (Zahl) Gesamtanzahl der Block-Header, die dein Node kennt.\n  \"chainstates\" : [                  // (JSON-Array) Liste der Chainstates.\n    {\n      \"blocks\" : 789012,             // (Zahl) Anzahl der Blöcke in diesem Chainstate (Blockhöhe).\n      \"bestblockhash\" : \"0000...\",   // (String) Hash des letzten Blocks in diesem Chainstate.\n      \"difficulty\" : 12345.67,       // (Zahl) Aktuelle Mining-Schwierigkeit.\n      \"verificationprogress\" : 1.0,  // (Zahl) Fortschritt der Synchronisation (1.0 = synchron).\n      \"validated\" : true,            // (Boolean) Ob dieser Chainstate vollständig validiert wurde.\n      // ... weitere Felder wie snapshot_blockhash, coins_db_cache_bytes etc. ...\n    }\n    // ... möglicherweise weitere Chainstate-Objekte ...\n  ]\n}\n```\n\n### Wichtige Hinweise\n*   **Meist nur ein relevanter State:** In der Regel wird nur ein Chainstate (der letzte in der Liste) der aktive und relevante sein.\n*   **Mehrere States bei Forks/Snapshots:** Mehrere Einträge siehst du typischerweise nur während Netzwerk-Forks oder wenn du experimentelle Features wie AssumeUTXO (Snapshots) nutzt.\n*   **Snapshot-Details:** Felder wie `snapshot_blockhash` und `validated` sind besonders im Kontext von UTXO-Snapshots aufschlussreich.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getchainstates\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getchainstates\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getchaintips": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.10.0",
        "complexity": "medium"
      },
      "title": "Kettenspitzen abrufen",
      "short": "Gibt Informationen über alle bekannten Spitzen (Tips) im Blockbaum zurück, einschließlich der Hauptkette und verwaister Zweige.",
      "examples": [
        "getchaintips"
      ],
      "details": "### Was ist `getchaintips`?\n\nDer Befehl `getchaintips` (verfügbar seit Bitcoin Core 0.10.0) zeigt dir alle \"Spitzen\" (Tips) von Blockketten-Zweigen, die deinem Node bekannt sind. Das ist mehr als nur die Spitze der aktuell gültigen Hauptkette. Dein Node kann auch von alternativen, kürzeren oder sogar ungültig gewordenen Zweigen (sogenannten \"Orphaned Branches\") wissen. `getchaintips` listet sie alle auf.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Netzwerk-Forks erkennen und verstehen:** Du siehst, welche unterschiedlichen Versionen der Blockchain dein Node gerade wahrnimmt. Das ist besonders nützlich, um zu beobachten, ob sich das Netzwerk gerade uneinig ist und sich die Kette aufspaltet (Fork).\n*   **Gesundheit des Netzwerks einschätzen:** Wenn dein Node sehr viele alternative Zweige sieht, könnte das auf Netzwerkprobleme oder häufige kleine Reorganisationen der Kette hindeuten.\n*   **Tieferes Verständnis und Debugging:** Entwickler können damit nachvollziehen, wie der Node die Blockkette intern sieht und welche Zweige er verfolgt.\n\n### Was ist das Ergebnis?\n\nDu erhältst ein JSON-Array. Jedes Objekt in diesem Array beschreibt einen Chain Tip (eine Kettenspitze) mit folgenden Informationen:\n\n```json\n[\n  {\n    \"height\" : 789012,\n      // (Zahl) Die Blockhöhe dieser Kettenspitze.\n    \"hash\" : \"0000...activehash\",\n      // (String) Der Block-Hash dieser Spitze.\n    \"branchlen\" : 0,\n      // (Zahl) Länge des Zweigs. Für die Hauptkette ist dieser Wert 0.\n      // Für andere Zweige: Anzahl der Blöcke, die diesen Zweig von der Hauptkette trennen.\n      // Ein Wert von 1 bedeutet, dieser Tip ist einen Block von der Hauptkette entfernt.\n    \"status\" : \"active\"\n      // (String) Der Validierungsstatus dieses Zweigs. Mögliche Werte sind:\n      //   - \"invalid\": Enthält ungültige Blöcke.\n      //   - \"headers-only\": Nur Header bekannt, Blöcke nicht heruntergeladen.\n      //   - \"valid-headers\": Blöcke heruntergeladen, aber noch nicht voll validiert.\n      //   - \"valid-fork\": Gültiger, aber nicht aktiver Zweig (alternative Kette).\n      //   - \"active\": Dies ist die Spitze der aktiven Hauptkette.\n  },\n  {\n    \"height\" : 789010,\n    \"hash\" : \"0000...forkhash\",\n    \"branchlen\" : 2,\n    \"status\" : \"valid-fork\"\n  }\n  // ... möglicherweise weitere Chain Tip Objekte ...\n]\n```\n\n### Wichtige Hinweise\n*   **`\"active\"` ist die Hauptkette:** Der Tip mit dem Status `\"active\"` ist die Blockchain, der dein Node aktuell folgt und als die gültige betrachtet.\n*   **Alternative Historien:** Andere Tips zeigen alternative Verläufe oder Zweige, die der Node kennt, aber nicht als Hauptkette ansieht.\n*   **`branchlen` verstehen:** Die `branchlen` (branch length = Zweiglänge) ist ein wichtiger Indikator dafür, wie \"weit entfernt\" ein alternativer Tip von der Hauptkette ist.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getchaintips\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getchaintips\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getchaintxstats": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "nblocks",
            "type": "number",
            "required": false,
            "desc": "Größe des Fensters in Blöcken (Standard: ein Monat, ca. 4320 Blöcke).",
            "placeholder": "z.B. 2016",
            "hint": "Anzahl der Blöcke für die Statistik. Standard ist ein Monat."
          },
          {
            "name": "blockhash",
            "type": "string",
            "required": false,
            "desc": "Der Hash des Blocks, der das Fenster beendet (Standard: Chain Tip).",
            "placeholder": "z.B. 0000000000000000002e63058c023a9a1de247a335455b839789523327524914",
            "hint": "Optional: End-Block für das Statistikfenster.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash muss genau 64 hexadezimale Zeichen enthalten."
            }
          }
        ],
        "rpcVersion": "0.16.0",
        "complexity": "medium"
      },
      "title": "Blockketten-Transaktionsstatistiken abrufen",
      "short": "Berechnet Statistiken über die Gesamtzahl und Rate von Transaktionen in der Kette.",
      "examples": [
        "getchaintxstats",
        "getchaintxstats 2016",
        "getchaintxstats 4320 0000000000000000002e63058c023a9a1de247a335455b839789523327524914"
      ],
      "details": "### Was ist `getchaintxstats`?\n\nDer Befehl `getchaintxstats` (verfügbar seit Bitcoin Core 0.16.0) berechnet Statistiken über die Anzahl und Rate von Transaktionen innerhalb eines bestimmten Zeitfensters in der Blockchain. Du kannst die Größe dieses Fensters (in Blöcken) und den Endpunkt (durch einen Block-Hash) selbst festlegen.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Netzwerkaktivität analysieren:** Wie viele Transaktionen wurden in den letzten 24 Stunden (ca. 144 Blöcke) oder in der letzten Schwierigkeitsperiode (2016 Blöcke) verarbeitet?\n*   **Transaktionsrate ermitteln:** Berechne die durchschnittliche Anzahl von Transaktionen pro Sekunde (`txrate`) für einen bestimmten Zeitraum.\n*   **Trends beobachten:** Verfolge, wie sich die Transaktionslast im Netzwerk über die Zeit entwickelt.\n\n### Parameter\n1.  `nblocks` (Zahl, optional, Standard: ein Monat, ca. 4320 Blöcke): Die Anzahl der Blöcke, die das Statistikfenster umfassen soll.\n2.  `blockhash` (String, optional, Standard: Chain Tip): Der Hash des Blocks, der das Ende des Fensters markiert. Die Statistik wird für die `nblocks` Blöcke *bis einschließlich* dieses Blocks berechnet.\n\n### Was ist das Ergebnis?\n\nEin JSON-Objekt mit den berechneten Statistiken für das angegebene Fenster:\n\n```json\n{\n  \"time\": 1672531200,                      // (Zahl) UNIX-Zeitstempel des letzten Blocks im Fenster.\n  \"txcount\": 800000000,                   // (Zahl, optional) Gesamtzahl der Transaktionen in der Kette bis zu diesem Block.\n  \"window_final_block_hash\": \"0000...\",   // (String) Hash des letzten Blocks im Fenster.\n  \"window_final_block_height\": 800000,    // (Zahl) Höhe des letzten Blocks im Fenster.\n  \"window_block_count\": 2016,             // (Zahl) Größe des Fensters in Blöcken.\n  \"window_interval\": 1209600,             // (Zahl, optional) Zeitdauer des Fensters in Sekunden.\n  \"window_tx_count\": 500000,              // (Zahl, optional) Anzahl der Transaktionen innerhalb des Fensters.\n  \"txrate\": 0.413                          // (Zahl, optional) Durchschnittliche Transaktionsrate pro Sekunde im Fenster.\n}\n```\n\n### Wichtige Hinweise\n*   Die Felder `window_interval`, `window_tx_count` und `txrate` werden nur zurückgegeben, wenn `window_block_count` größer als 0 ist.\n*   `txcount` ist möglicherweise nicht verfügbar, wenn der Node mit `assumeutxo` konfiguriert wurde, da die vollständige Transaktionshistorie dann nicht bekannt ist.\n*   Der Standardwert für `nblocks` ist die Anzahl der Blöcke, die in einem Monat erzeugt werden (ca. 4320 Blöcke bei 10 Minuten pro Block).\n\n### Beispiele für die Kommandozeile\n```bash\n# Statistik für das letzte Monat (Standard)\nbitcoin-cli getchaintxstats\n\n# Statistik für die letzte Schwierigkeitsperiode (2016 Blöcke)\nbitcoin-cli getchaintxstats 2016\n\n# Statistik für 4320 Blöcke, endend bei einem bestimmten Block\nbitcoin-cli getchaintxstats 4320 \"0000000000000000002e63058c023a9a1de247a335455b839789523327524914\"\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getchaintxstats\", \"params\": [2016]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getdeploymentinfo": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhash",
            "type": "string",
            "required": false,
            "desc": "Der Block-Hash, für den der Deployment-Status abgefragt werden soll.",
            "placeholder": "z.B. 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
            "hint": "Optional: Status für einen bestimmten Block-Hash abfragen, ansonsten für den aktuellen Tip.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash muss genau 64 hexadezimale Zeichen enthalten."
            }
          }
        ],
        "rpcVersion": "0.19.0",
        "complexity": "medium"
      },
      "title": "Konsens-Regeländerungen abrufen",
      "short": "Gibt Informationen zum Status von Konsens-Regeländerungen (Deployments) zurück.",
      "examples": [
        "getdeploymentinfo",
        "getdeploymentinfo 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
      ],
      "details": "### Was ist `getdeploymentinfo`?\n\nDer Befehl `getdeploymentinfo` liefert detaillierte Informationen über den Status verschiedener Konsens-Regeländerungen (sogenannte \"Deployments\") in der Bitcoin-Blockchain zu einem bestimmten Blockzeitpunkt (oder dem aktuellen Chain-Tip). Diese Deployments beziehen sich oft auf Soft Forks, die über Mechanismen wie BIP9 aktiviert werden oder bereits fest im Code verankert sind (\"buried\").\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Status von Soft Forks verfolgen:** Du kannst sehen, welche vorgeschlagenen oder aktiven Regeländerungen (z.B. SegWit, Taproot) definiert, in der Signalisierungsphase, bereits aktiviert (\"locked_in\" oder \"active\") oder fehlgeschlagen sind.\n*   **Details zu BIP9-Deployments:** Für BIP9-basierte Soft Forks erhältst du spezifische Informationen wie das verwendete Bit im Block-Header für die Signalisierung, Zeitfenster für die Aktivierung (Startzeit, Timeout), die notwendige Zustimmungsschwelle und Statistiken zur Signalisierung durch Miner.\n*   **Verständnis der Konsensregeln:** Hilft zu verstehen, welche Konsensregeln zu einem bestimmten Zeitpunkt in der Blockchain-Geschichte (definiert durch den optionalen `blockhash`) galten oder gelten werden.\n*   **Netzwerk-Upgrades analysieren:** Nützlich für Entwickler und Node-Betreiber, um den Fortschritt und die Akzeptanz von Netzwerk-Upgrades zu überwachen.\n\n### Parameter\n\n1.  `blockhash` (String, optional, Standard: Hash des aktuellen Chain-Tips): Der Hash des Blocks, für den der Status der Deployments abgefragt werden soll. Wenn nicht angegeben, wird der aktuelle Spitzenblock der Kette verwendet.\n\n### Was ist das Ergebnis?\n\nDu erhältst ein JSON-Objekt, das den abgefragten Block-Hash, seine Höhe und ein verschachteltes Objekt `deployments` enthält. Für jedes Deployment (z.B. `\"taproot\"`, `\"segwit\"`) gibt es ein eigenes Objekt mit Details:\n\n```json\n{\n  \"hash\": \"0000000000000000000a1b2c...\",    // (String) Angefragter Block-Hash (oder Tip)\n  \"height\": 750000,                        // (Zahl) Höhe des angefragten Blocks (oder Tips)\n  \"deployments\": {\n    \"csv\": {                             // (JSON-Objekt) Name des Deployments (z.B. csv, segwit, taproot)\n      \"type\": \"buried\",                  // (String) Typ: \"buried\" (fest verankert) oder \"bip9\"\n      \"height\": 419328,                  // (Zahl, optional) Höhe des ersten Blocks, ab dem die Regeln gelten (für \"buried\" oder \"bip9\" mit Status \"active\")\n      \"active\": true                     // (Boolean) true, wenn die Regeln für Mempool und nächsten Block erzwungen werden\n    },\n    \"segwit\": {\n      \"type\": \"buried\",\n      \"height\": 481824,\n      \"active\": true\n    },\n    \"taproot\": {                         // (JSON-Objekt) Beispiel für ein BIP9-Deployment\n      \"type\": \"bip9\",\n      \"height\": 709632,\n      \"active\": true,\n      \"bip9\": {                          // (JSON-Objekt, optional) Statusdetails für BIP9 Soft Forks\n        \"bit\": 2,                        // (Zahl, optional) Das Bit (0-28) im Block-Versionfeld für Signalisierung\n        \"start_time\": 1619222400,        // (Zahl) Früheste Median-Zeit (Unix-Timestamp) für Signalisierungsbeginn\n        \"timeout\": 1628035200,         // (Zahl) Median-Zeit (Unix-Timestamp), bis zu der \"locked_in\" erreicht sein muss\n        \"min_activation_height\": 709632, // (Zahl) Mindesthöhe für Aktivierung\n        \"status\": \"active\",              // (String) Status: \"defined\", \"started\", \"locked_in\", \"active\", \"failed\"\n        \"since\": 709632,                 // (Zahl) Höhe des ersten Blocks, für den dieser Status gilt\n        \"status_next\": \"active\",         // (String) Status des Deployments im nächsten Block\n        \"statistics\": {                  // (JSON-Objekt, optional) Statistische Daten zur Signalisierung\n          \"period\": 2016,                // (Zahl) Länge der Signalisierungsperiode in Blöcken\n          \"threshold\": 1815,             // (Zahl, optional) Nötige Blöcke mit Signal für Aktivierung (nur bei \"started\")\n          \"elapsed\": 2016,               // (Zahl) Vergangene Blöcke in aktueller Periode\n          \"count\": 2000,                 // (Zahl) Blöcke mit Signal in aktueller Periode\n          \"possible\": true               // (Boolean, optional) true, wenn Aktivierungsschwelle noch erreichbar (nur bei \"started\")\n        },\n        \"signalling\": \"################\" // (String, optional) Zeigt Blöcke, die signalisiert (#) oder nicht (-) haben (gekürzt dargestellt)\n      }\n    }\n    // ... weitere Deployments können hier gelistet sein\n  }\n}\n```\n\n### Wichtige Hinweise\n*   **Deployment-Typen:**\n    *   `\"buried\"`: Diese Regeländerungen sind fest im Code verankert und gelten ab einer bestimmten Blockhöhe als aktiv (z.B. ältere Soft Forks wie BIP34, BIP65, BIP66, CSV, SegWit).\n    *   `\"bip9\"`: Diese Regeländerungen folgen dem in BIP9 beschriebenen Prozess, bei dem Miner über einen bestimmten Zeitraum signalisieren müssen, um die Änderung zu aktivieren (z.B. Taproot).\n*   **BIP9-Statuswerte:**\n    *   `\"defined\"`: Das Deployment ist definiert, aber die Signalisierung hat noch nicht begonnen oder die Bedingungen für den Start sind noch nicht erfüllt.\n    *   `\"started\"`: Die Signalisierungsperiode hat begonnen; Miner können für die Aktivierung signalisieren.\n    *   `\"locked_in\"`: Die notwendige Mehrheit der Miner hat signalisiert; die Aktivierung erfolgt nach einer weiteren Periode.\n    *   `\"active\"`: Die Regeländerung ist aktiv und wird erzwungen.\n    *   `\"failed\"`: Das Zeitfenster für die Aktivierung ist abgelaufen, ohne dass \"locked_in\" erreicht wurde, oder die Aktivierung ist aus anderen Gründen gescheitert.\n*   Die genauen Namen der Deployments (z.B. `\"csv\"`, `\"segwit\"`, `\"taproot\"`) und ihre Parameter hängen von der Bitcoin Core Version und den im Netzwerk aktiven oder vorgeschlagenen Änderungen ab.\n*   Die Felder `height` (unter dem Deployment-Namen) und `bit`, `threshold`, `possible`, `signalling` (unter `bip9`) sind optional und werden nur angezeigt, wenn sie für den jeweiligen Deployment-Typ und -Status relevant sind.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getdeploymentinfo\n```\n```bash\nbitcoin-cli getdeploymentinfo \"0000000000000000000aabbccddeeff00112233445566778899aabbccddeeff\"\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getdeploymentinfo\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getdeploymentinfo\", \"params\": [\"0000000000000000000aabbccddeeff00112233445566778899aabbccddeeff\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getdescriptoractivity": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhashes",
            "type": "array",
            "required": false,
            "desc": "Liste der Blockhashes, die auf Aktivität geprüft werden sollen.",
            "placeholder": "[\"blockhash1\", \"blockhash2\", ...]",
            "hint": "Optional: Liste von Blockhashes (müssen zur Main Chain gehören)."
          },
          {
            "name": "scanobjects",
            "type": "array",
            "required": false,
            "desc": "Array von Scan-Objekten (Descriptor-Strings oder Objekte mit Descriptor und Range).",
            "placeholder": "[\"descriptor\", {\"desc\": \"descriptor\", \"range\": 1000}]",
            "hint": "Optional: Liste von Deskriptoren oder Objekten mit Deskriptor und Range."
          },
          {
            "name": "include_mempool",
            "type": "boolean",
            "required": false,
            "default": true,
            "desc": "Ob unbestätigte (Mempool-)Aktivität einbezogen werden soll.",
            "hint": "Standard: true (auch unbestätigte Transaktionen werden berücksichtigt)."
          }
        ],
        "rpcVersion": "29.0.0",
        "complexity": "high"
      },
      "title": "Aktivität von Deskriptoren abrufen",
      "short": "Zeigt Sende- und Empfangsaktivität für eine Menge von Deskriptoren und Blöcken.",
      "examples": [
        "getdescriptoractivity '[\"000000000000000000001347062c12fded7c528943c8ce133987e2e2f5a840ee\"]' '[\"addr(bc1qzl6nsgqzu89a66l50cvwapnkw5shh23zarqkw9)\"]'",
        "getdescriptoractivity '[]' '[]' true"
      ],
      "details": "### Was ist `getdescriptoractivity`?\n\nMit diesem Befehl kannst du die Sende- und Empfangsaktivität (Coins, die ausgegeben oder empfangen wurden) für eine Menge von Output-Deskriptoren in bestimmten Blöcken und im Mempool analysieren. Das ist besonders nützlich, wenn du wissen willst, welche deiner Adressen oder Wallet-Bereiche in bestimmten Blöcken aktiv waren.\n\n### Wofür wird es verwendet?\n\n*   **Analyse von Wallet-Aktivität:** Verfolge die Transaktionen, die für eine bestimmte Gruppe von Adressen (definiert durch Deskriptoren) relevant sind.\n*   **Gezielte Auswertungen:** Kann in Kombination mit dem `relevant_blocks`-Ergebnis von `scanblocks` für gezielte Auswertungen verwendet werden.\n\n### Parameter\n1. `blockhashes` (Array, optional): Eine Liste der Blockhashes, die geprüft werden sollen. Müssen zur Hauptkette gehören.\n2. `scanobjects` (Array, optional): Eine Liste von Deskriptoren oder Objekten mit Deskriptor und Range.\n3. `include_mempool` (Boolean, optional, Standard: `true`): Ob auch unbestätigte (Mempool-)Transaktionen berücksichtigt werden sollen.\n\n### Was ist das Ergebnis?\n\nEin JSON-Array mit allen gefundenen Aktivitäten (Senden/Empfangen), jeweils mit Betrag, Block, Transaktionsdaten und Skript-Infos.\n\n```json\n[\n  {\n    \"type\": \"receive\",\n    \"amount\": 0.00123,\n    \"parent_descs\": [\n      \"addr(bc1...)\"\n    ],\n    \"block\": {\n      \"hash\": \"0000...\",\n      \"height\": 800000\n    },\n    \"tx\": {\n      \"txid\": \"...\",\n      \"wtxid\": \"...\",\n      \"vin\": [],\n      \"vout\": []\n    }\n  }\n]\n```\n\n### Wichtige Hinweise\n- Dieser Befehl kann mehrere Minuten dauern. Bei Zeitüberschreitungen ggf. `-rpcclienttimeout=0` setzen.\n\n### Beispiele für die Kommandozeile\n```bash\n# Prüfe Aktivität für einen Deskriptor in einem bestimmten Block\nbitcoin-cli getdescriptoractivity '[\"000000000000000000001347062c12fded7c528943c8ce133987e2e2f5a840ee\"]' '[\"addr(bc1qzl6nsgqzu89a66l50cvwapnkw5shh23zarqkw9)\"]'\n\n# Prüfe Aktivität für alle Deskriptoren in der Wallet (nur Mempool)\nbitcoin-cli getdescriptoractivity '[]' '[]' true\n```"
    },
    "getdifficulty": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.1.0",
        "complexity": "low"
      },
      "title": "Block-Schwierigkeit abrufen",
      "short": "Gibt die aktuelle Proof-of-Work-Schwierigkeit als Vielfaches der minimalen Schwierigkeit zurück.",
      "examples": [
        "getdifficulty"
      ],
      "details": "### Was ist `getdifficulty`?\n\nDer Befehl `getdifficulty` (verfügbar seit sehr frühen Bitcoin Core Versionen) liefert dir die aktuelle Mining-Schwierigkeit (Proof-of-Work Difficulty) des Bitcoin-Netzwerks. Diese Zahl drückt aus, wie schwer es momentan ist, einen neuen Block zu finden und zur Blockchain hinzuzufügen.\n\nDie Schwierigkeit wird als ein Vielfaches der absolut minimal möglichen Schwierigkeit angegeben. Eine höhere Zahl bedeutet, dass es schwieriger ist, einen gültigen Block-Hash zu finden, was wiederum mehr Rechenleistung im Netzwerk erfordert.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Aktuelle Netzwerkschwierigkeit verstehen:** Du erhältst einen direkten Wert, der die momentane Herausforderung für Miner darstellt.\n*   **Veränderungen der Mining-Power beobachten:** Die Schwierigkeit passt sich alle 2016 Blöcke (ca. 2 Wochen) an die Gesamtmenge der im Netzwerk vorhandenen Rechenleistung (Hashrate) an. Steigt die Hashrate, steigt auch die Schwierigkeit, und umgekehrt. `getdifficulty` zeigt den aktuellen Stand dieser Anpassung.\n*   **Indikator für Netzwerksicherheit:** Eine hohe Schwierigkeit deutet im Allgemeinen auf ein sichereres Netzwerk hin, da mehr Rechenaufwand nötig wäre, um die Blockchain anzugreifen.\n\n### Was ist das Ergebnis?\n\nDer Befehl gibt eine einzelne Zahl (numerisch) zurück. Diese Zahl ist die aktuelle Proof-of-Work-Schwierigkeit.\n\n```\n12345678901234.56  // Beispiel: Die aktuelle Schwierigkeit\n```\n\n### Wichtige Hinweise\n*   **Keine Parameter:** Der Befehl benötigt keine Eingabeparameter.\n*   **Dynamische Anpassung:** Der Wert ändert sich im Laufe der Zeit mit den Anpassungen der Netzwerkschwierigkeit.\n*   **Bezug zur minimalen Schwierigkeit:** Der Wert ist ein Multiplikator. Die minimale Schwierigkeit (Difficulty 1) entspricht dem Finden eines Hashes, der mit einer bestimmten Anzahl von Null-Bits beginnt. Die aktuelle Schwierigkeit gibt an, um wie viel schwerer es ist, einen gültigen Hash zu finden, als bei dieser minimalen Anforderung.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getdifficulty\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getdifficulty\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getmempoolancestors": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "txid",
            "type": "string",
            "required": true,
            "desc": "Die ID der Transaktion im Mempool.",
            "placeholder": "z.B.  4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
            "hint": "Gib eine gültige Transaktions-ID (64 Hex-Zeichen) ein, die sich im Mempool befindet.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "TXID muss genau 64 hexadezimale Zeichen haben."
            }
          },
          {
            "name": "verbose",
            "type": "boolean",
            "required": false,
            "default": false,
            "desc": "True für ein detailliertes JSON-Objekt, false für eine einfache Liste von TXIDs.",
            "hint": "Optional: `true` für mehr Details, `false` (Standard) für eine kompakte Liste."
          }
        ],
        "rpcVersion": "0.13.0",
        "complexity": "medium"
      },
      "title": "Vorgänger-Transaktionen im Mempool abrufen",
      "short": "Gibt alle Vorgänger-Transaktionen (Ancestors) einer Transaktion im Mempool zurück.",
      "examples": [
        "getmempoolancestors 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
        "getmempoolancestors 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b true"
      ],
      "details": "### Was ist `getmempoolancestors`?\n\nStell dir eine Kette von unbestätigten Transaktionen vor, bei der eine Transaktion die Coins ausgibt, die eine andere gerade erst empfangen hat. Die vorhergehende Transaktion ist ein \"Vorgänger\" oder \"Ancestor\". Der Befehl `getmempoolancestors` spürt alle diese Vorgänger für eine bestimmte Transaktion im Mempool (dem Wartebereich für unbestätigte Transaktionen) auf.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Diagnose von \"feststeckenden\" Transaktionen:** Deine Transaktion wird nicht bestätigt? Vielleicht liegt es daran, dass einer ihrer Vorgänger eine zu niedrige Gebühr hat. Dieser Befehl hilft dir, den \"bremsenden\" Vorgänger zu identifizieren.\n*   **Analyse von Transaktionsketten:** Du kannst sehen, wie viele unbestätigte Transaktionen voneinander abhängen. Das ist entscheidend, um zu verstehen, warum Miner bestimmte Transaktionspakete auswählen.\n*   **Child-Pays-For-Parent (CPFP) verstehen:** Wenn eine Elterntransaktion eine niedrige Gebühr hat, kann man eine Kindtransaktion mit einer sehr hohen Gebühr erstellen. Miner betrachten die Gesamtgebühr von Kind und Eltern. `getmempoolancestors` hilft dir, diese Ketten zu sehen und die Gesamtgebühren (mit `verbose=true`) zu analysieren.\n\n### Parameter \n1.  `txid` (String, **erforderlich**): Die ID der Transaktion, deren Vorgänger du finden möchtest. Sie muss sich im Mempool befinden.\n2.  `verbose` (Boolean, optional, Standard: `false`):\n    *   `false`: Gibt eine einfache Liste mit den IDs aller Vorgänger-Transaktionen zurück.\n    *   `true`: Gibt ein detailliertes JSON-Objekt für jeden Vorgänger zurück, mit Informationen zu Größe, Gebühren, Abhängigkeiten etc.\n\n### Was ist das Ergebnis? \n\n-   **Bei `verbose = false` (Standard):** Ein Array von Transaktions-IDs.\n    ```json\n    [\n      \"vorgänger_txid_1\",\n      \"vorgänger_txid_2\"\n    ]\n    ```\n\n-   **Bei `verbose = true`:** Ein Objekt, bei dem jede Vorgänger-TXID ein Schlüssel zu einem weiteren Objekt mit detaillierten Informationen ist.\n    ```json\n    {\n      \"vorgänger_txid_1\": {\n        \"vsize\": 250, // Virtuelle Größe der Transaktion\n        \"time\": 1672531200, // Zeit, zu der sie in den Pool kam\n        \"height\": 800000, // Blockhöhe, als sie in den Pool kam\n        \"fees\": {\n          \"base\": 0.00005000, // Eigene Gebühr in BTC\n          \"ancestor\": 0.00012000 // Gesamtgebühr aller Vorgänger (inkl. dieser)\n        },\n        \"depends\": [\"noch_frühere_vorgänger_txid\"], // Direkte Eltern-Transaktionen\n        ...\n      }\n    }\n    ```\n\n### Wichtige Hinweise: \n*   Der Befehl funktioniert nur, wenn die angegebene `txid` im Mempool deines Nodes vorhanden ist.\n*   Ein \"Ancestor\" ist jede Transaktion in der Kette vor der angegebenen Transaktion, die ebenfalls noch unbestätigt ist.\n\n### Beispiele für die Kommandozeile:  \n```bash\n# Einfache Liste der Vorgänger-IDs\nbitcoin-cli getmempoolancestors \"deine_txid\"\n\n# Detaillierte Informationen zu allen Vorgängern\nbitcoin-cli getmempoolancestors \"deine_txid\" true\n```\n```bash\n# Beispiel mit curl\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getmempoolancestors\", \"params\": [\"deine_txid\", true]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getmempooldescendants": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "txid",
            "type": "string",
            "required": true,
            "desc": "Die ID der Transaktion im Mempool.",
            "placeholder": "z.B. 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
            "hint": "Gib eine gültige Transaktions-ID (64 Hex-Zeichen) ein, die sich im Mempool befindet.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "TXID muss genau 64 hexadezimale Zeichen haben."
            }
          },
          {
            "name": "verbose",
            "type": "boolean",
            "required": false,
            "default": false,
            "desc": "True für ein detailliertes JSON-Objekt, false für eine einfache Liste von TXIDs.",
            "hint": "Optional: `true` für mehr Details, `false` (Standard) für eine kompakte Liste."
          }
        ],
        "rpcVersion": "0.13.0",
        "complexity": "medium"
      },
      "title": "Nachkommen-Transaktionen im Mempool abrufen",
      "short": "Gibt alle Nachkommen-Transaktionen (Descendants) einer Transaktion im Mempool zurück.",
      "examples": [
        "getmempooldescendants 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
        "getmempooldescendants 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b true"
      ],
      "details": "### Was ist `getmempooldescendants`?\n\nStell dir eine Kette von unbestätigten Transaktionen vor. Wenn eine Transaktion (`Kind`) die Coins ausgibt, die eine andere Transaktion (`Eltern`) gerade erst empfangen hat, ist die Kind-Transaktion ein 'Nachkomme' oder 'Descendant'. Der Befehl `getmempooldescendants` findet alle diese Nachkommen für eine bestimmte Transaktion im Mempool.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Analyse von Transaktionsketten:** Du kannst sehen, welche anderen unbestätigten Transaktionen von deiner Transaktion abhängen.\n*   **Child-Pays-For-Parent (CPFP) anwenden:** Wenn deine Transaktion eine zu niedrige Gebühr hat und 'feststeckt', kannst du eine Nachkommen-Transaktion mit einer sehr hohen Gebühr erstellen. Miner betrachten oft die Gesamtgebühr des Pakets (Eltern + Kind). Dieser Befehl hilft dir, die Kette zu sehen und die Gesamtgebühren (mit `verbose=true`) zu analysieren, um zu sehen, ob ein CPFP-Bump erfolgreich sein könnte.\n*   **Verständnis von Paket-Relay:** Verstehen, wie Transaktionspakete im Netzwerk weitergegeben werden.\n\n### Parameter\n1.  `txid` (String, **erforderlich**): Die ID der Transaktion, deren Nachkommen du finden möchtest. Sie muss sich im Mempool befinden.\n2.  `verbose` (Boolean, optional, Standard: `false`):\n    *   `false`: Gibt eine einfache Liste mit den IDs aller Nachkommen-Transaktionen zurück.\n    *   `true`: Gibt ein detailliertes JSON-Objekt für jeden Nachkommen zurück, mit Informationen zu Größe, Gebühren, Abhängigkeiten etc.\n\n### Was ist das Ergebnis?\n\n-   **Bei `verbose = false` (Standard):** Ein Array von Transaktions-IDs.\n    ```json\n    [\n      \"nachkomme_txid_1\",\n      \"nachkomme_txid_2\"\n    ]\n    ```\n\n-   **Bei `verbose = true`:** Ein Objekt, bei dem jede Nachkommen-TXID ein Schlüssel zu einem weiteren Objekt mit detaillierten Informationen ist.\n    ```json\n    {\n      \"nachkomme_txid_1\": {\n        \"vsize\": 150, // Virtuelle Größe der Transaktion\n        \"weight\": 600, // Transaktionsgewicht\n        \"time\": 1672531300, // Zeit, zu der sie in den Pool kam\n        \"height\": 800000, // Blockhöhe, als sie in den Pool kam\n        \"fees\": {\n          \"base\": 0.00008000, // Eigene Gebühr in BTC\n          \"descendant\": 0.00015000 // Gesamtgebühr aller Nachkommen (inkl. dieser) mit Deltas, in BTC.\n        },\n        \"depends\": [\"deine_txid\"], // Direkte Eltern-Transaktionen\n        \"spentby\": [\"noch_späterer_nachkomme_txid\"], // Direkte Kind-Transaktionen\n        \"unbroadcast\": false // Ob die Transaktion noch nicht an Peers gesendet wurde\n      }\n    }\n    ```\n\n### Wichtige Hinweise:\n*   Der Befehl funktioniert nur, wenn die angegebene `txid` im Mempool deines Nodes vorhanden ist.\n*   Ein \"Descendant\" ist jede Transaktion, die direkt oder indirekt von den Outputs der angegebenen Transaktion abhängt und ebenfalls noch unbestätigt ist.\n*   Das Feld `bip125-replaceable` ist veraltet und wird möglicherweise nicht mehr angezeigt.\n\n### Beispiele für die Kommandozeile:\n```bash\n# Einfache Liste der Nachkommen-IDs\nbitcoin-cli getmempooldescendants \"deine_txid\"\n\n# Detaillierte Informationen zu allen Nachkommen\nbitcoin-cli getmempooldescendants \"deine_txid\" true\n```\n```bash\n# Beispiel mit curl\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getmempooldescendants\", \"params\": [\"deine_txid\", true]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getmempoolentry": {
       "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "txid",
            "type": "string",
            "required": true,
            "desc": "Die ID der Transaktion im Mempool.",
            "placeholder": "z.B. 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
            "hint": "Gib eine gültige Transaktions-ID (64 Hex-Zeichen) ein, die sich im Mempool befindet.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "TXID muss genau 64 hexadezimale Zeichen haben."
            }
          }
        ],
        "rpcVersion": "0.13.0",
        "complexity": "medium"
      },
      "title": "Mempool-Eintrag für eine Transaktion abrufen",
      "short": "Gibt detaillierte Mempool-Daten für eine bestimmte Transaktion zurück.",
      "examples": [
        "getmempoolentry 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"
      ],
      "details": "### Was ist `getmempoolentry`?\n\nDer Befehl `getmempoolentry` liefert eine Fülle von detaillierten Informationen über eine einzelne, unbestätigte Transaktion, die sich derzeit im Mempool deines Nodes befindet. Es ist das detaillierteste Analysewerkzeug für eine einzelne wartende Transaktion.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Detaillierte Transaktionsanalyse:** Du erhältst alle relevanten Daten zu einer Transaktion im Mempool, einschließlich ihrer Größe, Gebühren, Abhängigkeiten und mehr.\n*   **Gebühren- und Prioritätsprüfung:** Analysiere die genauen Gebühren (`base`, `modified`) und die Gebühren der gesamten Transaktionsfamilie (`ancestor`, `descendant`), um zu verstehen, wie attraktiv sie für Miner ist.\n*   **Abhängigkeiten verstehen:** Sieh genau, von welchen anderen unbestätigten Transaktionen diese Transaktion abhängt (`depends`) und welche anderen Transaktionen von ihr abhängen (`spentby`).\n*   **Debugging:** Ideal, um zu diagnostizieren, warum eine bestimmte Transaktion nicht bestätigt wird.\n\n### Parameter\n1.  `txid` (String, **erforderlich**): Die ID der Transaktion, die du untersuchen möchtest. Sie muss sich im Mempool befinden.\n\n### Was ist das Ergebnis?\n\nEin JSON-Objekt mit detaillierten Informationen zur Transaktion im Mempool:\n\n```json\n{\n  \"vsize\": 250,                         // (Zahl) Virtuelle Transaktionsgröße gemäß BIP 141.\n  \"weight\": 1000,                       // (Zahl) Transaktionsgewicht gemäß BIP 141.\n  \"time\": 1672531200,                   // (Zahl) Lokale Zeit (Unix-Timestamp), zu der die Transaktion in den Pool kam.\n  \"height\": 800000,                     // (Zahl) Blockhöhe, als die Transaktion in den Pool kam.\n  \"descendantcount\": 2,                 // (Zahl) Anzahl der Nachkommen im Mempool (inkl. dieser Transaktion).\n  \"descendantsize\": 500,                  // (Zahl) Virtuelle Größe aller Nachkommen im Mempool (inkl. dieser).\n  \"ancestorcount\": 3,                   // (Zahl) Anzahl der Vorgänger im Mempool (inkl. dieser Transaktion).\n  \"ancestorsize\": 750,                    // (Zahl) Virtuelle Größe aller Vorgänger im Mempool (inkl. dieser).\n  \"wtxid\": \"wtxid_hex_string\",            // (String) Hash der serialisierten Transaktion, einschließlich Witness-Daten.\n  \"fees\": {\n    \"base\": 0.00005000,                 // (Zahl) Transaktionsgebühr in BTC.\n    \"modified\": 0.00005000,             // (Zahl) Transaktionsgebühr mit Gebühren-Deltas für Mining-Priorität, in BTC.\n    \"ancestor\": 0.00012000,             // (Zahl) Gesamtgebühr aller Vorgänger (inkl. dieser) mit Deltas, in BTC.\n    \"descendant\": 0.00008000            // (Zahl) Gesamtgebühr aller Nachkommen (inkl. dieser) mit Deltas, in BTC.\n  },\n  \"depends\": [\n    \"parent_txid_hex\"                 // (Array) Unbestätigte Eltern-Transaktionen.\n  ],\n  \"spentby\": [\n    \"child_txid_hex\"                  // (Array) Unbestätigte Kind-Transaktionen.\n  ],\n  \"bip125-replaceable\": false,          // (Boolean, VERALTET) Ob die Transaktion RBF (Replace-by-Fee) signalisiert.\n  \"unbroadcast\": false                  // (Boolean) Ob die Transaktion noch nicht an Peers gesendet wurde.\n}\n```\n\n### Wichtige Hinweise\n*   Der Befehl funktioniert nur für Transaktionen, die sich aktuell im Mempool deines Nodes befinden.\n*   Das Feld `bip125-replaceable` ist veraltet und wird in zukünftigen Versionen möglicherweise entfernt.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getmempoolentry \"deine_txid\"\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getmempoolentry\", \"params\": [\"deine_txid\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getmempoolinfo": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "29.0.0",
        "complexity": "low"
      },
      "title": "Mempool-Informationen abrufen",
      "short": "Gibt Details über den aktiven Zustand des Transaktions-Mempools zurück.",
      "examples": [
        "getmempoolinfo"
      ],
      "details": "### Was ist `getmempoolinfo`?\n\nDer Befehl `getmempoolinfo` liefert eine zusammenfassende Statistik über den Mempool deines Nodes – den Wartebereich für unbestätigte Transaktionen. Er gibt dir einen schnellen Überblick über die aktuelle Auslastung, die Anzahl der wartenden Transaktionen und die minimal erforderliche Gebühr.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Mempool-Auslastung überwachen:** Wie viele Transaktionen (`size`) warten gerade und wie viel Speicherplatz (`usage`) belegen sie? Ist der Mempool fast voll (`maxmempool`)?\n*   **Aktuelle Gebührenlage einschätzen:** Was ist die minimale Gebührenrate (`mempoolminfee`), die eine neue Transaktion haben muss, um überhaupt in den Mempool aufgenommen zu werden?\n*   **Node-Status prüfen:** Wurde der Mempool von der Festplatte geladen (`loaded`)? Wie viele Transaktionen sind noch nicht im Netzwerk verbreitet (`unbroadcastcount`)?\n\n### Was ist das Ergebnis?\n\nEin JSON-Objekt mit verschiedenen Statistiken zum Mempool:\n\n```json\n{\n  \"loaded\": true,                     // (Boolean) True, wenn der Ladevorgang des gespeicherten Mempools abgeschlossen ist.\n  \"size\": 1234,                       // (Zahl) Aktuelle Anzahl der Transaktionen im Mempool.\n  \"bytes\": 567890,                    // (Zahl) Summe der virtuellen Größen aller Transaktionen (BIP 141).\n  \"usage\": 1234567,                   // (Zahl) Gesamter Speicherverbrauch des Mempools in Bytes.\n  \"total_fee\": 0.12345678,            // (Zahl) Gesamtgebühren aller Transaktionen im Mempool in BTC.\n  \"maxmempool\": 300000000,            // (Zahl) Maximaler Speicherverbrauch für den Mempool in Bytes.\n  \"mempoolminfee\": 0.00001000,        // (Zahl) Minimale Gebührenrate in BTC/kvB, damit eine Transaktion akzeptiert wird.\n  \"minrelaytxfee\": 0.00001000,        // (Zahl) Aktuelle minimale Weiterleitungsgebühr für Transaktionen.\n  \"incrementalrelayfee\": 0.00001000,  // (Zahl) Minimale Erhöhung der Gebührenrate für Mempool-Begrenzung oder Ersetzung in BTC/kvB.\n  \"unbroadcastcount\": 0,              // (Zahl) Anzahl der Transaktionen, die noch nicht im Netzwerk verbreitet wurden.\n  \"fullrbf\": false                    // (Boolean, VERALTET) True, wenn der Mempool Full-RBF akzeptiert.\n}\n```\n\n### Wichtige Hinweise\n*   Dieser Befehl ist ein schneller Weg, um die \"Gesundheit\" und den \"Druck\" im Mempool deines Nodes zu beurteilen.\n*   Das Feld `fullrbf` ist veraltet.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli getmempoolinfo\n```\n```bash\ncurl --user meinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getmempoolinfo\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getrawmempool": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "verbose",
            "type": "boolean",
            "required": false,
            "default": false,
            "desc": "True für ein detailliertes JSON-Objekt, false für eine einfache Liste von TXIDs.",
            "hint": "Standard: false (Liste von TXIDs). True für detaillierte Objekte."
          },
          {
            "name": "mempool_sequence",
            "type": "boolean",
            "required": false,
            "default": false,
            "desc": "Wenn verbose=false, wird ein Objekt mit TXID-Liste und Mempool-Sequenznummer zurückgegeben.",
            "hint": "Nur wirksam, wenn verbose=false. Nützlich, um Mempool-Änderungen zu verfolgen."
          }
        ],
        "rpcVersion": "0.7.0",
        "complexity": "medium"
      },
      "title": "Aktuellen Mempool abrufen",
      "short": "Gibt alle Transaktionen im Mempool zurück, entweder als Liste von IDs oder als detailliertes Objekt.",
      "examples": [
        "getrawmempool",
        "getrawmempool true",
        "getrawmempool false true"
      ],
      "details": "### Was ist `getrawmempool`?\n\nDer Befehl `getrawmempool` gibt dir einen kompletten \"Schnappschuss\" des Mempools deines Nodes. Du kannst entweder eine einfache Liste aller Transaktions-IDs (TXIDs) erhalten oder, mit der `verbose`-Option, eine sehr detaillierte Aufschlüsselung jeder einzelnen Transaktion im Mempool.\n\n### Wofür wird es verwendet?\n\n*   **Vollständige Übersicht:** Erhalte eine Liste aller Transaktionen, die gerade auf eine Bestätigung warten.\n*   **Detaillierte Mempool-Analyse:** Mit `verbose=true` kannst du den gesamten Mempool auf einmal analysieren – ideal für Explorer, Forscher oder jeden, der die Gebühren, Größen und Abhängigkeiten aller wartenden Transaktionen sehen möchte.\n*   **Mempool-Änderungen verfolgen:** Mit `mempool_sequence=true` erhältst du zusätzlich zur TXID-Liste eine Sequenznummer. Ändert sich diese Nummer, hat sich der Inhalt des Mempools geändert. Das ist effizienter als ständig die gesamte Liste abzurufen und zu vergleichen.\n\n### Parameter\n1.  `verbose` (Boolean, optional, Standard: `false`):\n    *   `false`: Gibt ein JSON-Array zurück, das nur die TXIDs aller Transaktionen im Mempool enthält.\n    *   `true`: Gibt ein großes JSON-Objekt zurück, bei dem jede TXID der Schlüssel zu einem weiteren Objekt mit allen Details zu dieser Transaktion ist (ähnlich wie bei `getmempoolentry`).\n2.  `mempool_sequence` (Boolean, optional, Standard: `false`):\n    *   Dieser Parameter hat nur eine Wirkung, wenn `verbose=false` ist.\n    *   `true`: Gibt ein JSON-Objekt zurück, das die Liste der TXIDs (`txids`) und die aktuelle Mempool-Sequenznummer (`mempool_sequence`) enthält.\n\n### Was ist das Ergebnis?\n\n- **Bei `verbose = false` (Standard):** Ein Array von Transaktions-IDs.\n```json\n[\n  \"txid1\",\n  \"txid2\",\n  ...\n]\n```\n\n- **Bei `verbose = true`:** Ein großes JSON-Objekt, bei dem jede TXID ein Schlüssel zu einem Objekt mit Transaktionsdetails ist.\n```json\n{\n  \"txid1\": {\n    \"vsize\": 226,\n    \"weight\": 904,\n    \"time\": 1672531200,\n    \"height\": 800000,\n    \"descendantcount\": 1,\n    \"descendantsize\": 226,\n    \"ancestorcount\": 1,\n    \"ancestorsize\": 226,\n    \"wtxid\": \"wtxid_von_txid1\",\n    \"fees\": { ... },\n    \"depends\": [],\n    \"spentby\": [],\n    \"unbroadcast\": false\n  },\n  ...\n}\n```\n\n- **Bei `verbose = false` und `mempool_sequence = true`:** Ein Objekt mit TXID-Liste und Sequenznummer.\n```json\n{\n  \"txids\": [\n    \"txid1\",\n    \"txid2\",\n    ...\n  ],\n  \"mempool_sequence\": 12345\n}\n```\n\n### Wichtige Hinweise\n*   Die Ausgabe kann bei einem vollen Mempool und `verbose=true` sehr groß sein!\n*   Das Feld `bip125-replaceable` ist veraltet.\n*   Um Details zu nur *einer* Transaktion abzurufen, ist `getmempoolentry` effizienter.\n\n### Beispiele für die Kommandozeile\n```bash\n# Liste aller TXIDs im Mempool\nbitcoin-cli getrawmempool\n\n# Detaillierte Informationen für alle Transaktionen\nbitcoin-cli getrawmempool true\n\n# Liste der TXIDs mit Mempool-Sequenznummer\nbitcoin-cli getrawmempool false true\n```\n```bash\n# Beispiel mit curl für die detaillierte Ansicht\ncurl --user meinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getrawmempool\", \"params\": [true]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "gettxout": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "txid",
            "type": "string",
            "required": true,
            "desc": "Die Transaktions-ID.",
            "placeholder": "z.B. 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
            "hint": "Gib eine gültige Transaktions-ID (64 Hex-Zeichen) ein.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "TXID muss genau 64 hexadezimale Zeichen haben."
            }
          },
          {
            "name": "n",
            "type": "number",
            "required": true,
            "desc": "Die Indexnummer des Outputs (vout).",
            "placeholder": "z.B. 0",
            "hint": "Der Index des Outputs, beginnend bei 0.",
            "validation": {
              "min": 0
            }
          },
          {
            "name": "include_mempool",
            "type": "boolean",
            "required": false,
            "default": true,
            "desc": "Ob der Mempool in die Suche einbezogen werden soll.",
            "hint": "Standard: true. Wenn false, wird der Mempool ignoriert."
          }
        ],
        "rpcVersion": "0.5.0",
        "complexity": "low"
      },
      "title": "Details zu einem Transaktions-Output abrufen",
      "short": "Gibt Details zu einem nicht ausgegebenen Transaktions-Output (UTXO) zurück.",
      "examples": [
        "gettxout 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b 1",
        "gettxout 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b 1 false"
      ],
      "details": "### Was ist `gettxout`?\n\nDer Befehl `gettxout` ist ein grundlegendes Werkzeug, um den Status eines bestimmten Transaktions-Outputs (eines \"Coins\") zu überprüfen. Er teilt dir mit, ob ein bestimmter Output noch nicht ausgegeben wurde (also ein UTXO ist) und liefert Details dazu.\n\n### Wofür wird es verwendet?\n\n*   **UTXO-Status überprüfen:** Finde heraus, ob ein bestimmter Output, den du vielleicht ausgeben möchtest, noch verfügbar ist.\n*   **Details zu einem Coin abrufen:** Erhalte Informationen wie den Wert (in BTC), die Anzahl der Bestätigungen und die zugehörige Adresse oder das Skript.\n*   **Validierung:** Überprüfe die Gültigkeit von Transaktionen, indem du sicherstellst, dass die Inputs, die sie ausgeben wollen, tatsächlich existieren und unspent sind.\n\n### Parameter\n1.  `txid` (String, **erforderlich**): Die ID der Transaktion, die den Output enthält.\n2.  `n` (Zahl, **erforderlich**): Der Index des Outputs innerhalb der Transaktion (beginnend bei 0).\n3.  `include_mempool` (Boolean, optional, Standard: `true`):\n    *   `true` (Standard): Der Befehl prüft sowohl die Blockchain als auch den Mempool. Wenn der Output in der Blockchain existiert, aber bereits in einer Mempool-Transaktion ausgegeben wird, wird er als \"nicht gefunden\" (`null`) gemeldet.\n    *   `false`: Der Befehl prüft *nur* die Blockchain. Ein Output, der im Mempool ausgegeben wird, würde hier immer noch als unspent angezeigt werden.\n\n### Was ist das Ergebnis?\n\n- **Wenn der UTXO nicht gefunden wurde (oder bereits ausgegeben ist):**\n  Du erhältst `null`.\n\n- **Wenn der UTXO gefunden wurde:**\n  Ein JSON-Objekt mit den Details des Outputs:\n  ```json\n  {\n    \"bestblock\": \"0000...\",       // (String) Der Hash des Blocks an der Spitze der Kette.\n    \"confirmations\": 123,         // (Zahl) Die Anzahl der Bestätigungen.\n    \"value\": 0.12345678,          // (Zahl) Der Wert des Outputs in BTC.\n    \"scriptPubKey\": {             // (JSON-Objekt) Details zum Output-Skript.\n      \"asm\": \"OP_DUP OP_HASH160 ...\", // (String) Das Skript in menschenlesbarer Form.\n      \"desc\": \"addr(...)\",          // (String) Der abgeleitete Descriptor für den Output.\n      \"hex\": \"76a914...\",           // (String) Das rohe Skript als Hex-String.\n      \"type\": \"pubkeyhash\",         // (String) Der Skript-Typ (z.B. pubkeyhash, scripthash).\n      \"address\": \"1...\"             // (String, optional) Die Bitcoin-Adresse, falls vorhanden.\n    },\n    \"coinbase\": false             // (Boolean) True, wenn dies ein Coinbase-Output ist.\n  }\n  ```\n\n### Wichtige Hinweise\n*   Dieser Befehl ist fundamental für Wallets und Dienste, die den Status von Coins verfolgen müssen.\n*   Das Verhalten von `include_mempool` ist entscheidend: `true` gibt dir den \"aktuellsten\" Status (was kann ich *jetzt* ausgeben?), während `false` den reinen Blockchain-Zustand widerspiegelt.\n\n### Beispiele für die Kommandozeile\n```bash\n# Details zu einem UTXO abrufen (inkl. Mempool-Prüfung)\nbitcoin-cli gettxout \"deine_txid\" 1\n\n# Details abrufen und den Mempool ignorieren\nbitcoin-cli gettxout \"deine_txid\" 1 false\n```\n```bash\n# Beispiel mit curl\ncurl --user meinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"gettxout\", \"params\": [\"deine_txid\", 1]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "gettxoutproof": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "txids",
            "type": "array",
            "required": true,
            "desc": "Eine Liste von Transaktions-IDs, für die der Beweis erbracht werden soll.",
            "placeholder": "[\"txid1\", \"txid2\"]",
            "hint": "Gib eine oder mehrere Transaktions-IDs an."
          },
          {
            "name": "blockhash",
            "type": "string",
            "required": false,
            "desc": "Wenn angegeben, wird nach den Transaktionen in diesem spezifischen Block gesucht.",
            "placeholder": "z.B. 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
            "hint": "Optional: Der Hash des Blocks, der die Transaktion(en) enthält.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash muss genau 64 hexadezimale Zeichen enthalten."
            }
          }
        ],
        "rpcVersion": "0.12.0",
        "complexity": "medium"
      },
      "title": "Merkle-Beweis für Transaktionen abrufen",
      "short": "Gibt einen hex-kodierten Beweis zurück, dass eine Transaktion in einem Block enthalten ist (Merkle-Beweis).",
      "examples": [
        "gettxoutproof '[\"txid1\",\"txid2\"]'",
        "gettxoutproof '[\"txid1\"]' \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\""
      ],
      "details": "### Was ist `gettxoutproof`?\n\nDieser Befehl liefert einen \"Merkle-Beweis\". Das ist ein kryptographischer Beweis, der zeigt, dass eine oder mehrere Transaktionen tatsächlich in einem bestimmten Block enthalten sind, ohne dass man den gesamten Block herunterladen muss. Dies ist ein Kernkonzept der Simplified Payment Verification (SPV).\n\n### Wofür wird es verwendet?\n\n*   **Für Light-Wallets (SPV):** Eine Light-Wallet kann diesen Beweis von einem Full Node anfordern, um zu verifizieren, dass eine für sie relevante Transaktion bestätigt wurde, ohne die gesamte Blockchain speichern zu müssen.\n*   **Nachweis gegenüber Dritten:** Du kannst diesen Beweis verwenden, um einer anderen Partei zu beweisen, dass eine Transaktion in einem Block enthalten ist.\n\n### Parameter\n1.  `txids` (Array von Strings, **erforderlich**): Eine Liste mit einer oder mehreren Transaktions-IDs, die in den Beweis aufgenommen werden sollen.\n2.  `blockhash` (String, optional): Wenn angegeben, wird der Beweis für diesen spezifischen Block erstellt. Wenn nicht angegeben, versucht der Node, den Block selbst zu finden.\n\n### Was ist das Ergebnis?\n\nEine einzelne, lange hexadezimale Zeichenkette. Diese Zeichenkette enthält die serialisierten Daten des Merkle-Beweises. Dieser Beweis kann mit dem Befehl `verifytxoutproof` überprüft werden.\n\n```\n\"01000000...\"\n```\n\n### Wichtige Hinweise\n*   **Funktioniert nicht immer standardmäßig:** Der Befehl funktioniert nur dann zuverlässig, wenn entweder:\n    1.  Dein Node mit der Option `-txindex=1` gestartet wurde (was einen vollständigen Transaktionsindex erstellt).\n    2.  Der optionale `blockhash`-Parameter angegeben wird, damit der Node weiß, wo er suchen muss.\n    3.  Für eine der angeforderten Transaktionen noch ein unspent Output (UTXO) im UTXO-Set des Nodes vorhanden ist.\n*   Wenn die Bedingungen nicht erfüllt sind, schlägt der Befehl fehl.\n\n### Beispiele für die Kommandozeile\n```bash\n# Beweis für zwei Transaktionen anfordern (benötigt -txindex oder UTXO)\nbitcoin-cli gettxoutproof '[\"txid_a\", \"txid_b\"]'\n\n# Beweis für eine Transaktion in einem bestimmten Block anfordern\nbitcoin-cli gettxoutproof '[\"txid_c\"]' \"der_blockhash\"\n```\n```bash\n# Beispiel mit curl\ncurl --user meinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"gettxoutproof\", \"params\": [[\"txid_a\"], \"der_blockhash\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "gettxoutsetinfo": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "hash_type",
            "type": "string",
            "required": false,
            "default": "hash_serialized_3",
            "desc": "Gibt an, welcher UTXO-Set-Hash berechnet werden soll.",
            "placeholder": "z.B. muhash",
            "hint": "Wähle den Hash-Typ: 'hash_serialized_3', 'muhash' oder 'none'.",
            "options": [
              { "value": "hash_serialized_3", "label": "hash_serialized_3", "desc": "Der ältere, serialisierte Hash-Algorithmus." },
              { "value": "muhash", "label": "muhash", "desc": "Ein neuerer, effizienterer Hash-Algorithmus." },
              { "value": "none", "label": "none", "desc": "Es wird kein Hash berechnet." }
            ]
          },
          {
            "name": "hash_or_height",
            "type": "string|number",
            "required": false,
            "desc": "Block-Hash oder Höhe für historische Statistiken (nur mit coinstatsindex).",
            "placeholder": "z.B. 800000 oder Block-Hash",
            "hint": "Optional: Zielhöhe für die Statistik (benötigt -coinstatsindex=1)."
          },
          {
            "name": "use_index",
            "type": "boolean",
            "required": false,
            "default": true,
            "desc": "Gibt an, ob der coinstatsindex verwendet werden soll, falls verfügbar.",
            "hint": "Standard: true. Auf false setzen, um den Index zu ignorieren."
          }
        ],
        "rpcVersion": "0.21.0",
        "complexity": "medium"
      },
      "title": "UTXO-Set-Statistiken abrufen",
      "short": "Gibt Statistiken über das UTXO-Set (alle nicht ausgegebenen Transaktions-Outputs) zurück.",
      "examples": [
        "gettxoutsetinfo",
        "gettxoutsetinfo \"muhash\"",
        "gettxoutsetinfo \"none\" 800000"
      ],
      "details": "### Was ist `gettxoutsetinfo`?\n\nDieser Befehl liefert eine Fülle von statistischen Daten über den aktuellen oder einen historischen Zustand des UTXO-Sets. Das UTXO-Set ist die Menge aller \"Coins\", die derzeit im Bitcoin-Netzwerk ausgegeben werden können. Der Befehl ist ein mächtiges Werkzeug zur Analyse der Blockchain.\n\n### Wofür wird es verwendet?\n\n*   **Gesamtzustand der Blockchain analysieren:** Finde heraus, wie viele unspent Outputs (`txouts`) es gibt, wie hoch der Gesamtwert aller Coins (`total_amount`) ist und wie viel Speicherplatz die Chainstate-Datenbank belegt (`disk_size`).\n*   **Historische Daten abfragen:** Wenn dein Node mit einem Coin-Statistik-Index (`-coinstatsindex=1`) läuft, kannst du den Zustand des UTXO-Sets für jeden beliebigen Block in der Vergangenheit abfragen.\n*   **Unspendable Coins identifizieren:** Mit dem `coinstatsindex` kannst du detaillierte Informationen über Coins erhalten, die aus verschiedenen Gründen (z.B. OP_RETURN-Outputs) niemals ausgegeben werden können.\n*   **Blockchain-Wachstum verfolgen:** Überwache, wie sich die Größe und der Wert des UTXO-Sets über die Zeit entwickeln.\n\n### Parameter\n1.  `hash_type` (String, optional, Standard: `\"hash_serialized_3\"`): Bestimmt, welcher Hash über das UTXO-Set berechnet wird. `\"none\"` ist am schnellsten, wenn kein Hash benötigt wird.\n2.  `hash_or_height` (String oder Zahl, optional): Der Block-Hash oder die Höhe, für den die Statistik berechnet werden soll. **Dieser Parameter funktioniert nur, wenn der `coinstatsindex` aktiviert ist.**\n3.  `use_index` (Boolean, optional, Standard: `true`): Wenn `false`, wird der `coinstatsindex` ignoriert, selbst wenn er vorhanden ist.\n\n### Was ist das Ergebnis?\n\nEin JSON-Objekt mit den Statistiken. Die verfügbaren Felder hängen davon ab, ob der `coinstatsindex` verwendet wird.\n\n```json\n{\n  \"height\": 800000,                   // (Zahl) Die Blockhöhe, für die die Statistik gilt.\n  \"bestblock\": \"0000...\",             // (String) Der Hash des Blocks bei dieser Höhe.\n  \"txouts\": 95000000,                 // (Zahl) Die Anzahl der unspent transaction outputs (UTXOs).\n  \"bogosize\": 6000000000,             // (Zahl) Eine bedeutungslose Metrik zur Größe des UTXO-Sets.\n  \"muhash\": \"aabbcc...\",              // (String, optional) Der MuHash des UTXO-Sets.\n  \"transactions\": 65000000,           // (Zahl, optional) Anzahl der Transaktionen mit UTXOs (nicht mit coinstatsindex).\n  \"disk_size\": 5500000000,            // (Zahl, optional) Geschätzte Größe der Chainstate-Datenbank auf der Festplatte (nicht mit coinstatsindex).\n  \"total_amount\": 19400000.123,       // (Zahl) Der Gesamtwert aller Coins im UTXO-Set in BTC.\n  \"total_unspendable_amount\": 10.456, // (Zahl, optional) Gesamtwert der unspendable Coins (nur mit coinstatsindex).\n  \"block_info\": {                     // (JSON-Objekt, optional) Infos zum Block bei dieser Höhe (nur mit coinstatsindex).\n    \"prevout_spent\": 1234.56,         // (Zahl) Gesamtwert aller in diesem Block ausgegebenen Prevouts.\n    \"coinbase\": 6.25,                 // (Zahl) Coinbase-Belohnung dieses Blocks.\n    \"new_outputs_ex_coinbase\": 1228.31, // (Zahl) Gesamtwert neuer Outputs (ohne Coinbase).\n    \"unspendable\": 0.1,               // (Zahl) Gesamtwert der in diesem Block erzeugten unspendable Outputs.\n    \"unspendables\": {                 // (JSON-Objekt) Detaillierte Aufschlüsselung der unspendable Outputs.\n      \"genesis_block\": 0,\n      \"bip30\": 0,\n      \"scripts\": 0.1,\n      \"unclaimed_rewards\": 0\n    }\n  }\n}\n```\n\n### Wichtige Hinweise\n*   **`coinstatsindex` ist entscheidend:** Um das volle Potenzial dieses Befehls (insbesondere historische Daten und unspendable amounts) zu nutzen, muss dein Node mit der Option `-coinstatsindex=1` gestartet werden. Dies erfordert zusätzlichen Speicherplatz und eine längere initiale Synchronisation.\n*   **Performance:** Ohne den `coinstatsindex` kann dieser Aufruf sehr lange dauern, da der Node das gesamte UTXO-Set durchsuchen muss.\n*   **Exklusive Felder:** Beachte, dass die Felder `transactions` und `disk_size` nur verfügbar sind, wenn der `coinstatsindex` *nicht* verwendet wird. Die Felder `total_unspendable_amount` und `block_info` sind nur verfügbar, wenn der Index verwendet wird.\n\n### Beispiele für die Kommandozeile\n```bash\n# Standardstatistik für den aktuellen Tip (kann langsam sein)\nbitcoin-cli gettxoutsetinfo\n\n# Statistik für den aktuellen Tip, aber ohne Hash-Berechnung (schneller)\nbitcoin-cli gettxoutsetinfo \"none\"\n\n# Statistik für Blockhöhe 800000 (benötigt -coinstatsindex=1)\nbitcoin-cli gettxoutsetinfo \"none\" 800000\n\n# Statistik für einen bestimmten Block-Hash (benötigt -coinstatsindex=1)\nbitcoin-cli gettxoutsetinfo \"none\" \"0000000000000000000a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u\"\n\n# Ignoriere den Index, auch wenn er existiert\nbitcoin-cli -named gettxoutsetinfo use_index=false\n```"
    },
    "gettxspendingprevout": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "outputs",
            "type": "array",
            "required": true,
            "desc": "Die zu prüfenden Transaktions-Outputs.",
            "placeholder": "[{\"txid\":\"a08e...\",\"vout\":3}]",
            "hint": "Array von Objekten, jedes mit txid und vout."
          }
        ],
        "rpcVersion": "24.0.0",
        "complexity": "medium"
      },
      "title": "UTXO-Prüfung im Mempool",
      "short": "Durchsucht den Mempool nach Transaktionen, die angegebene Outputs ausgeben.",
      "examples": [
        "gettxspendingprevout '[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":3}]'"
      ],
      "details": "### Was ist `gettxspendingprevout`?\n\nDieser Befehl durchsucht den Mempool, um herauszufinden, ob einer der von dir angegebenen Transaktions-Outputs (prevouts) von einer unbestätigten Transaktion ausgegeben wird.\n\n### Wofür wird es verwendet?\n\n*   **Double-Spend-Prüfung im Mempool:** Überprüfe, ob ein Coin, den du erhalten hast, bereits in einer anderen, noch unbestätigten Transaktion im Mempool ausgegeben wird.\n*   **Transaktionsstatus verfolgen:** Nützlich für Dienste, die schnell wissen müssen, ob ein bestimmter UTXO im Mempool ausgegeben wird, ohne die gesamte Transaktion abrufen zu müssen.\n\n### Parameter\n1.  `outputs` (JSON-Array, **erforderlich**): Ein Array von Objekten, die die zu prüfenden Transaktions-Outputs definieren. Jedes Objekt muss eine `txid` (String) und eine `vout` (Zahl) enthalten.\n\n### Was ist das Ergebnis?\n\nEin JSON-Array, das für jeden angefragten Output ein Objekt zurückgibt. Wenn ein Output von einer Mempool-Transaktion ausgegeben wird, enthält das Objekt die `spendingtxid`.\n\n```json\n[\n  {\n    \"txid\": \"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\n    \"vout\": 3,\n    \"spendingtxid\": \"b19f...\" \n  }\n]\n```\n\n### Wichtige Hinweise\n*   Dieser Befehl durchsucht *nur* den Mempool. Er prüft nicht die Blockchain.\n*   Wenn ein Output im Ergebnis-Array das Feld `spendingtxid` nicht enthält, bedeutet das, dass er (im Mempool) nicht ausgegeben wird.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli gettxspendingprevout '[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":3}]'\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"gettxspendingprevout\", \"params\": [\"[{\\\"txid\\\":\\\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\\\",\\\"vout\\\":3}]\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "importmempool": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "filepath",
            "type": "string",
            "required": true,
            "desc": "Der Pfad zur mempool.dat-Datei.",
            "placeholder": "/pfad/zu/mempool.dat",
            "hint": "Gib den vollständigen Pfad zur Mempool-Datei an."
          },
          {
            "name": "options",
            "type": "object",
            "required": false,
            "desc": "Ein JSON-Objekt mit optionalen benannten Argumenten.",
            "properties": [
              {
                "name": "use_current_time",
                "type": "boolean",
                "default": true,
                "desc": "Gibt an, ob die aktuelle Systemzeit oder die Zeitstempel aus der Mempool-Datei verwendet werden sollen."
              },
              {
                "name": "apply_fee_delta_priority",
                "type": "boolean",
                "default": false,
                "desc": "Gibt an, ob die Gebühren-Delta-Metadaten aus der Datei angewendet werden sollen."
              },
              {
                "name": "apply_unbroadcast_set",
                "type": "boolean",
                "default": false,
                "desc": "Gibt an, ob die Metadaten für noch nicht verbreitete Transaktionen aus der Datei angewendet werden sollen."
              }
            ]
          }
        ],
        "rpcVersion": "27.0",
        "complexity": "high"
      },
      "title": "Importiere Mempool-Daten",
      "short": "Importiert eine mempool.dat-Datei und versucht, deren Inhalt zum Mempool hinzuzufügen.",
      "examples": [
        "importmempool /pfad/zu/mempool.dat",
        "importmempool /pfad/zu/mempool.dat '{\"use_current_time\": false}'"
      ],
      "details": "### Was ist `importmempool`?\n\nDer Befehl `importmempool` (verfügbar seit Bitcoin Core 27.0) ermöglicht es, eine `mempool.dat`-Datei zu importieren und zu versuchen, die darin enthaltenen Transaktionen zum Mempool deines Nodes hinzuzufügen. Dies kann nützlich sein, um den Mempool-Zustand zwischen Nodes zu synchronisieren oder nach einem Neustart wiederherzustellen, ohne auf die automatische `persistmempool`-Funktion angewiesen zu sein.\n\n### Wofür wird es verwendet?\n*   **Mempool wiederherstellen:** Lade einen zuvor mit `savemempool` gesicherten Mempool-Zustand.\n*   **Synchronisation zwischen Nodes:** Übertrage den Mempool-Zustand von einem Node auf einen anderen.\n*   **Testen und Simulation:** Importiere spezifische Mempool-Szenarien für Testzwecke.\n\n### Parameter\n1.  `filepath` (String, **erforderlich**): Der Pfad zur `mempool.dat`-Datei.\n2.  `options` (JSON-Objekt, optional): Ein Objekt zur Übergabe benannter Argumente:\n    *   `use_current_time` (Boolean, optional, Standard: `true`): Wenn `true`, wird die aktuelle Systemzeit für die importierten Transaktionen verwendet. Wenn `false`, werden die Zeitstempel aus der Datei übernommen.\n    *   `apply_fee_delta_priority` (Boolean, optional, Standard: `false`): Wenn `true`, werden die Gebühren-Delta-Metadaten (gesetzt durch `prioritisetransaction`) aus der Datei angewendet.\n    *   `apply_unbroadcast_set` (Boolean, optional, Standard: `false`): Wenn `true`, werden die Metadaten für noch nicht im Netzwerk verbreitete Transaktionen aus der Datei übernommen.\n\n### Was ist das Ergebnis?\n\nEin leeres JSON-Objekt `{}` bei erfolgreicher Ausführung.\n\n### Wichtige Hinweise\n**WARNUNG:** Das Importieren von nicht vertrauenswürdigen Dateien ist gefährlich, insbesondere wenn Metadaten (`use_current_time: false`, `apply_fee_delta_priority: true`, `apply_unbroadcast_set: true`) aus der Datei übernommen werden. Dies kann zu unerwarteten Problemen und unerwünschtem Verhalten führen. Verwende diesen Befehl nur mit Dateien aus Quellen, denen du absolut vertraust.\n\n### Beispiele für die Kommandozeile\n```bash\n# Importiere eine Mempool-Datei mit Standardoptionen\nbitcoin-cli importmempool /pfad/zu/mempool.dat\n\n# Importiere eine Mempool-Datei und übernehme die Zeitstempel aus der Datei\nbitcoin-cli importmempool /pfad/zu/mempool.dat '{\"use_current_time\": false}'\n```\n```bash\n# Beispiel mit curl\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"importmempool\", \"params\": [\"/pfad/zu/mempool.dat\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "loadtxoutset": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "path",
            "type": "string",
            "required": true,
            "desc": "Pfad zur Snapshot-Datei. Wenn relativ, wird er dem Datenverzeichnis vorangestellt.",
            "placeholder": "utxo.dat",
            "hint": "Dateiname oder Pfad zur UTXO-Snapshot-Datei."
          }
        ],
        "rpcVersion": "22.0.0",
        "complexity": "high"
      },
      "title": "Lade UTXO-Snapshot",
      "short": "Lädt das serialisierte UTXO-Set aus einer Snapshot-Datei.",
      "examples": [
        "loadtxoutset utxo.dat"
      ],
      "details": "### Was ist `loadtxoutset`?\n\nDer Befehl `loadtxoutset` (verfügbar seit Bitcoin Core 22.0) ermöglicht es, einen UTXO-Snapshot (erstellt mit `dumptxoutset` oder von einer Drittquelle) zu laden, um den Prozess der initialen Synchronisation eines neuen Nodes drastisch zu beschleunigen. Dies ist Teil der `assumeutxo`-Funktionalität.\n\n### Wie funktioniert es?\n\n1.  **Snapshot laden:** Der Inhalt der Snapshot-Datei wird in eine zweite, temporäre Chainstate-Datenbank geladen.\n2.  **Schnelle Synchronisation:** Diese temporäre Datenbank wird sofort verwendet, um den Node mit der aktuellen Spitze des Netzwerks zu synchronisieren. Dein Node ist so innerhalb von Minuten einsatzbereit.\n3.  **Validierung im Hintergrund:** Gleichzeitig beginnt der Node im Hintergrund mit dem normalen initialen Block-Download (IBD). Er validiert die gesamte Blockchain von Grund auf, bis er den Block erreicht, auf dem der Snapshot basiert.\n4.  **Übergang:** Sobald die Hintergrundvalidierung abgeschlossen ist, wird der temporäre Chainstate durch den vollständig validierten ersetzt.\n\n### Wofür wird es verwendet?\n\n*   **Schnelles Aufsetzen neuer Nodes:** Reduziert die Zeit für die initiale Synchronisation von Tagen oder Stunden auf wenige Minuten.\n*   **Wiederherstellung:** Schnelle Wiederherstellung eines Nodes nach einem Datenverlust, wenn ein aktueller Snapshot verfügbar ist.\n\n### Parameter\n1.  `path` (String, **erforderlich**): Der Pfad zur Snapshot-Datei. Wenn der Pfad relativ ist, wird er als relativ zum Datenverzeichnis des Nodes interpretiert.\n\n### Was ist das Ergebnis?\n\nEin JSON-Objekt, das den Erfolg des Ladevorgangs bestätigt:\n\n```json\n{\n  \"coins_loaded\": 75123456,      // (Zahl) Die Anzahl der aus dem Snapshot geladenen Coins (UTXOs).\n  \"tip_hash\": \"0000...\",         // (String) Der Hash des Blocks, auf dem der Snapshot basiert.\n  \"base_height\": 800000,        // (Zahl) Die Höhe des Basis-Blocks.\n  \"path\": \"/pfad/zu/utxo.dat\"  // (String) Der absolute Pfad, von dem der Snapshot geladen wurde.\n}\n```\n\n### Wichtige Hinweise\n*   **Vertrauenswürdigkeit von Snapshots:** Obwohl der Inhalt des Snapshots per Hash überprüft wird, um Korruption auszuschließen, vertraut der Node vorübergehend dem Ersteller des Snapshots hinsichtlich der Gültigkeit des UTXO-Sets. Verwende Snapshots nur aus vertrauenswürdigen Quellen.\n*   **Lange Laufzeit:** Der Ladevorgang kann einige Minuten dauern. Es wird empfohlen, den RPC-Client-Timeout zu erhöhen oder auf 0 zu setzen (kein Timeout), z.B. mit `bitcoin-cli -rpcclienttimeout=0 ...`.\n*   **Hintergrundprozess:** Der Node ist nach dem Laden zwar schnell nutzbar, der vollständige Validierungsprozess läuft aber noch im Hintergrund weiter.\n\n### Beispiele für die Kommandozeile\n```bash\n# Lade einen UTXO-Snapshot und setze den Timeout auf unendlich\nbitcoin-cli -rpcclienttimeout=0 loadtxoutset utxo.dat\n```\n```bash\n# Beispiel mit curl (Timeout wird serverseitig konfiguriert)\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"loadtxoutset\", \"params\": [\"utxo.dat\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "preciousblock": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhash",
            "type": "string",
            "required": true,
            "desc": "Der Hash des Blocks, der als 'wertvoll' markiert werden soll.",
            "placeholder": "z.B. 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
            "hint": "Gib einen gültigen Block-Hash (64 hexadezimale Zeichen) ein.",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash muss genau 64 hexadezimale Zeichen enthalten."
            }
          }
        ],
        "rpcVersion": "0.10.0",
        "complexity": "medium"
      },
      "title": "Bevorzugter Block",
      "short": "Behandelt einen Block so, als wäre er vor anderen Blöcken mit der gleichen Arbeit empfangen worden.",
      "examples": [
        "preciousblock 00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
      ],
      "details": "### Was ist `preciousblock`?\n\nDer Befehl `preciousblock` ist ein manueller Eingriff in die Kettenauswahl deines Nodes. Er weist den Node an, einen bestimmten Block als \"wertvoll\" zu behandeln. Das bedeutet, der Node wird diesen Block so behandeln, als hätte er ihn vor allen konkurrierenden Blöcken mit der exakt gleichen Menge an Arbeit (Proof-of-Work) gesehen.\n\n### Wofür wird es verwendet?\n\n*   **Manuelle Fork-Auflösung:** Wenn zwei Blöcke auf derselben Höhe gefunden werden (ein kleiner Fork), entscheidet normalerweise die Reihenfolge, in der dein Node sie empfängt, welchen Zweig er zunächst verfolgt. Mit `preciousblock` kannst du diese Entscheidung manuell überschreiben und den Node zwingen, einen bestimmten Zweig zu bevorzugen.\n*   **Debugging von Reorganisationen:** Entwickler können diesen Befehl nutzen, um das Verhalten des Nodes bei Ketten-Reorganisationen zu testen.\n*   **Wiederherstellung nach Problemen:** In seltenen Fällen kann es helfen, einen Node wieder auf die korrekte Kette zu bringen, wenn er aus irgendeinem Grund einem falschen, aber gleichwertigen Zweig folgt.\n\n### Parameter\n1.  `blockhash` (String, **erforderlich**): Der Hash des Blocks, den du als \"wertvoll\" markieren möchtest.\n\n### Was ist das Ergebnis?\n\nBei Erfolg gibt der Befehl `null` zurück.\n\n```json\nnull\n```\n\n### Wichtige Hinweise\n*   **Temporärer Effekt:** Die Wirkung von `preciousblock` ist nicht dauerhaft und geht bei einem Neustart des Nodes verloren.\n*   **Überschreibbar:** Ein späterer Aufruf von `preciousblock` für einen anderen Block kann einen früheren Aufruf überschreiben.\n*   **Gleiche Arbeit erforderlich:** Dieser Befehl kann einen Node nicht dazu zwingen, einen Block mit *weniger* Arbeit als die aktuelle Kettenspitze zu bevorzugen. Er funktioniert nur als \"Tie-Breaker\" bei Blöcken mit identischer Arbeit.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli preciousblock \"der_blockhash_den_du_bevorzugen_willst\"\n```\n```bash\ncurl --user meinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"preciousblock\", \"params\": [\"der_blockhash_den_du_bevorzugen_willst\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "pruneblockchain": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "height",
            "type": "number",
            "required": true,
            "desc": "Die Blockhöhe, bis zu der gekürzt werden soll. Kann eine Höhe oder ein UNIX-Timestamp sein.",
            "placeholder": "z.B. 800000",
            "hint": "Gib die Zielhöhe oder einen Timestamp an, bis zu dem Blöcke entfernt werden sollen.",
            "validation": {
              "min": 1
            }
          }
        ],
        "rpcVersion": "0.14.0",
        "complexity": "medium"
      },
      "title": "Blockchain kürzen",
      "short": "Kürzt die Blockchain, indem alte Blöcke von der Festplatte entfernt werden.",
      "examples": [
        "pruneblockchain 800000",
        "pruneblockchain 1672531200"
      ],
      "details": "### Was ist `pruneblockchain`?\n\nDer Befehl `pruneblockchain` löst manuell den Prozess aus, bei dem alte, bereits verifizierte Blöcke von der Festplatte deines Nodes gelöscht werden. Dies ist nur möglich, wenn dein Node im \"Pruning-Modus\" läuft, der beim Start konfiguriert wird (z.B. mit `-prune=550`, um die Blockchain auf mindestens 550 MB zu beschränken).\n\n### Wofür wird es verwendet?\n\n*   **Speicherplatz freigeben:** Der Hauptzweck ist, manuell Speicherplatz freizugeben, indem man die Blockchain bis zu einer bestimmten Höhe oder einem bestimmten Zeitpunkt kürzt.\n*   **Manuelle Kontrolle:** Während der Node im Pruning-Modus Blöcke automatisch löscht, erlaubt dieser Befehl eine gezielte, manuelle Ausführung dieses Prozesses.\n\n### Parameter\n1.  `height` (Zahl, **erforderlich**): Die Zielhöhe, bis zu der die Blockchain gekürzt werden soll. Dieser Parameter kann auf zwei Arten interpretiert werden:\n    *   **Blockhöhe:** Eine direkte Blocknummer (z.B. `800000`). Der Node wird versuchen, alle Blöcke bis zu dieser Höhe zu löschen.\n    *   **UNIX-Timestamp:** Eine Zeitangabe in Sekunden seit 1970 (z.B. `1672531200`). Der Node wird Blöcke löschen, deren Zeitstempel mindestens 2 Stunden älter ist als der angegebene Timestamp.\n\n### Was ist das Ergebnis?\n\nEine einzelne Zahl, die die Höhe des letzten Blocks angibt, der erfolgreich gekürzt (gepruned) wurde.\n\n```json\n800000\n```\n\n### Wichtige Hinweise\n*   **Pruning-Modus erforderlich:** Dein Node muss mit einer Pruning-Einstellung (z.B. `-prune=N`, wobei N >= 550) gestartet worden sein. Andernfalls schlägt der Befehl fehl.\n*   **Irreversibel:** Gelöschte Blockdaten können nicht wiederhergestellt werden, ohne die Blockchain erneut zu synchronisieren.\n*   **Einschränkungen:** Du kannst nicht die gesamte Blockchain kürzen. Eine bestimmte Anzahl der neuesten Blöcke wird immer aufbewahrt. Die angegebene `height` muss höher sein als der letzte bereits gekürzte Block und darf nicht zu nah an der aktuellen Spitze der Kette liegen.\n\n### Beispiele für die Kommandozeile\n```bash\n# Kürze die Blockchain bis zur Blockhöhe 800000\nbitcoin-cli pruneblockchain 800000\n\n# Kürze Blöcke, die älter als ein bestimmter Zeitpunkt sind (plus 2 Stunden Puffer)\nbitcoin-cli pruneblockchain 1672531200\n```\n```bash\n# Beispiel mit curl\ncurl --user meinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"pruneblockchain\", \"params\": [800000]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "savemempool": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.16.0",
        "complexity": "low"
      },
      "title": "Mempool speichern",
      "short": "Speichert den aktuellen Mempool auf der Festplatte.",
      "examples": [
        "savemempool"
      ],
      "details": "### Was ist `savemempool`?\n\nDer Befehl `savemempool` (verfügbar seit Bitcoin Core 0.16.0) weist deinen Node an, den aktuellen Inhalt seines Transaktions-Mempools (den Wartebereich für unbestätigte Transaktionen) in einer Datei auf der Festplatte zu speichern. Standardmäßig geschieht dies bereits automatisch beim Herunterfahren des Nodes, wenn die Option `-persistmempool` (standardmäßig aktiviert) gesetzt ist. Dieser Befehl erlaubt es dir, den Mempool manuell zu sichern, ohne den Node neu starten zu müssen.\n\n### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Manuelle Sicherung des Mempools:** Du kannst den aktuellen Stand der wartenden Transaktionen explizit sichern.\n*   **Schnellerer Neustart (indirekt):** Wenn der Node nach einem unerwarteten Herunterfahren neu startet, kann er den zuvor gespeicherten Mempool laden (wenn `-persistmempool` aktiv ist). `savemempool` stellt sicher, dass eine aktuelle Version gespeichert wird.\n*   **Vermeidung von Datenverlust bei Abstürzen:** Sichert den Zustand des Mempools, falls der Node abstürzen sollte, bevor er ihn automatisch speichern kann.\n\n### Was ist das Ergebnis?\n\nDer Befehl gibt ein JSON-Objekt zurück, das den Pfad und Dateinamen enthält, unter dem der Mempool gespeichert wurde.\n\n```json\n{\n  \"filename\": \"/pfad/zum/bitcoin/datenverzeichnis/mempool.dat\" \n  // (String) Das Verzeichnis und der Dateiname, wo der Mempool gespeichert wurde.\n}\n```\n\n### Wichtige Hinweise\n*   **`-persistmempool`:** Die Funktionalität hängt eng mit der Konfigurationsoption `-persistmempool` zusammen. Wenn diese Option deaktiviert ist (`-persistmempool=0`), wird `savemempool` zwar ausgeführt, aber der Mempool wird beim nächsten Start nicht automatisch geladen.\n*   **Fehler bei laufendem Ladevorgang:** Der Befehl schlägt fehl, wenn gerade ein vorheriger Dump des Mempools geladen wird. Du musst warten, bis dieser Vorgang abgeschlossen ist.\n*   **Speicherort:** Der Mempool wird standardmäßig im Bitcoin-Datenverzeichnis in der Datei `mempool.dat` gespeichert.\n\n### Beispiele für die Kommandozeile\n```bash\nbitcoin-cli savemempool\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"savemempool\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "scanblocks": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "action",
            "type": "string",
            "required": true,
            "desc": "Die auszuführende Aktion: 'start', 'abort' oder 'status'.",
            "placeholder": "start",
            "hint": "Wähle die Aktion, die ausgeführt werden soll.",
            "options": [
              { "value": "start", "label": "start", "desc": "Startet einen neuen Scan." },
              { "value": "abort", "label": "abort", "desc": "Bricht den aktuellen Scan ab." },
              { "value": "status", "label": "status", "desc": "Zeigt den Fortschritt des aktuellen Scans an." }
            ]
          },
          {
            "name": "scanobjects",
            "type": "array",
            "required": false,
            "desc": "Array von Scan-Objekten (Deskriptoren). Erforderlich für 'start'.",
            "placeholder": "[\"addr(bc1...)\"]",
            "hint": "Gib die zu scannenden Deskriptoren an. Erforderlich für 'start'."
          },
          {
            "name": "start_height",
            "type": "number",
            "required": false,
            "default": 0,
            "desc": "Die Blockhöhe, ab der der Scan beginnen soll.",
            "placeholder": "z.B. 700000",
            "hint": "Optional: Starthöhe für den Scan."
          },
          {
            "name": "stop_height",
            "type": "number",
            "required": false,
            "desc": "Die Blockhöhe, bei der der Scan enden soll (Standard: Chain Tip).",
            "placeholder": "z.B. 800000",
            "hint": "Optional: Endhöhe für den Scan."
          },
          {
            "name": "filtertype",
            "type": "string",
            "required": false,
            "default": "basic",
            "desc": "Der Typ des zu verwendenden Filters.",
            "placeholder": "basic",
            "hint": "Optional: Der zu verwendende Filtertyp."
          },
          {
            "name": "options",
            "type": "object",
            "required": false,
            "desc": "JSON-Objekt mit zusätzlichen Optionen.",
            "properties": [
              {
                "name": "filter_false_positives",
                "type": "boolean",
                "default": false,
                "desc": "Falsch-positive Ergebnisse filtern (langsamer)."
              }
            ]
          }
        ],
        "rpcVersion": "22.0.0",
        "complexity": "high"
      },
      "title": "Scanne Blöcke",
      "short": "Durchsucht Blöcke nach relevanten Transaktionen für gegebene Deskriptoren (benötigt Blockfilterindex).",
      "examples": [
        "scanblocks start '[\"addr(bc1q...)\"]' 700000",
        "scanblocks status",
        "scanblocks abort"
      ],
      "details": "### Was ist `scanblocks`?\n\n`scanblocks` ist ein leistungsstarker, aber langlaufender Befehl, der die Blockchain nach Blöcken durchsucht, die für eine Reihe von angegebenen Output-Deskriptoren relevant sein könnten. Er nutzt die BIP157/158 Blockfilter, um diesen Prozess effizient zu gestalten, ohne jeden Block vollständig herunterladen zu müssen. Der Befehl ist zustandsbehaftet, d.h. es kann immer nur ein Scan gleichzeitig laufen, dessen Status abgefragt und der abgebrochen werden kann.\n\n### Wofür wird es verwendet?\n\n*   **Wallet-Wiederherstellung:** Wenn du eine Wallet aus einem Seed wiederherstellst, kannst du mit `scanblocks` effizient nach vergangenen Transaktionen suchen, die zu deinen Adressen gehören.\n*   **Import von Deskriptoren:** Wenn du einen neuen Deskriptor zu deiner Wallet hinzufügst, kannst du damit nach dessen historischer Aktivität suchen.\n*   **Gezielte Blockchain-Analyse:** Finde alle Blöcke, die für eine bestimmte Menge von Adressen oder Skripten relevant sind.\n\n### Aktionen (`action`)\n1.  `start`: Startet einen neuen Scan mit den angegebenen `scanobjects` und optionalen Parametern. Gibt das Ergebnis erst zurück, wenn der Scan abgeschlossen ist.\n2.  `status`: Zeigt den Fortschritt des aktuell laufenden Scans in Prozent an. Gibt `null` zurück, wenn kein Scan läuft.\n3.  `abort`: Bricht den aktuell laufenden Scan ab. Gibt `true` zurück, wenn der Abbruch erfolgreich eingeleitet wurde.\n\n### Parameter\n*   `action` (String, **erforderlich**): `start`, `status` oder `abort`.\n*   `scanobjects` (Array, **erforderlich für `start`**): Eine Liste von Output-Deskriptoren oder Objekten, die den Suchbereich definieren.\n*   `start_height` / `stop_height` (Zahl, optional): Definieren den Höhenbereich für den Scan.\n*   `options.filter_false_positives` (Boolean, optional): Wenn `true`, versucht der Befehl, falsch-positive Treffer herauszufiltern. Dies ist langsamer und kann bei geprunten Nodes fehlschlagen.\n\n### Was ist das Ergebnis?\n\nDas Ergebnis hängt von der `action` ab:\n\n- **Bei `action = 'start'` (nach Abschluss):**\n```json\n{\n  \"from_height\": 700000,\n  \"to_height\": 800000,\n  \"relevant_blocks\": [\n    \"0000000000000000000a1b2c...\",\n    \"0000000000000000000d4e5f...\"\n  ],\n  \"completed\": true\n}\n```\n\n- **Bei `action = 'status'` (während des Scans):**\n```json\n{\n  \"progress\": 25.5,\n  \"current_height\": 725500\n}\n```\n\n- **Bei `action = 'abort'`:**\n`true` oder `false`.\n\n### Wichtige Hinweise\n*   **`blockfilterindex=1` erforderlich:** Dein Node muss mit der Option `-blockfilterindex=1` gestartet worden sein, damit dieser Befehl funktioniert.\n*   **Lange Laufzeit:** Ein `start`-Aufruf kann mehrere Minuten oder länger dauern. Es wird dringend empfohlen, den RPC-Timeout zu deaktivieren, z.B. mit `bitcoin-cli -rpcclienttimeout=0 scanblocks ...`.\n*   **Falsch-Positive:** Da Blockfilter probabilistisch sind, kann die Ergebnisliste `relevant_blocks` auch Hashes von Blöcken enthalten, die keine tatsächlichen Treffer aufweisen.\n\n### Beispiele für die Kommandozeile\n```bash\n# Starte einen Scan für einen Deskriptor ab Höhe 300000 (ohne Timeout)\nbitcoin-cli -rpcclienttimeout=0 scanblocks start '[\"addr(bcrt1q4u4nsgk6ug0sqz7r3rj9tykjxrsl0yy4d0wwte)\"]' 300000\n\n# Frage den Status des laufenden Scans ab\nbitcoin-cli scanblocks status\n\n# Breche den laufenden Scan ab\nbitcoin-cli scanblocks abort\n```"
    },
    "scantxoutset": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "action",
            "type": "string",
            "required": true,
            "desc": "Die auszuführende Aktion: 'start', 'abort' oder 'status'.",
            "placeholder": "start",
            "hint": "Wähle die Aktion, die ausgeführt werden soll.",
            "options": [
              { "value": "start", "label": "start", "desc": "Startet einen neuen Scan." },
              { "value": "abort", "label": "abort", "desc": "Bricht den aktuellen Scan ab." },
              { "value": "status", "label": "status", "desc": "Zeigt den Fortschritt des aktuellen Scans an." }
            ]
          },
          {
            "name": "scanobjects",
            "type": "array",
            "required": false,
            "desc": "Array von Scan-Objekten (Deskriptoren). Erforderlich für 'start'.",
            "placeholder": "[\"addr(bc1...)\"]",
            "hint": "Gib die zu scannenden Deskriptoren an. Erforderlich für 'start'."
          }
        ],
        "rpcVersion": "0.17.0",
        "complexity": "high"
      },
      "title": "Scanne UTXO-Set",
      "short": "Durchsucht das UTXO-Set nach Einträgen, die zu bestimmten Output-Deskriptoren passen.",
      "examples": [
        "scantxoutset start '[\"addr(bc1q...)\"]'",
        "scantxoutset status",
        "scantxoutset abort"
      ],
      "details": "### Was ist `scantxoutset`?\n\nDer Befehl `scantxoutset` durchsucht die gesamte Menge der aktuell nicht ausgegebenen Transaktions-Outputs (das UTXO-Set) nach Einträgen, die zu den von dir angegebenen Deskriptoren passen. Im Gegensatz zu `scanblocks`, das die gesamte Blockchain-Historie durchsucht, konzentriert sich dieser Befehl nur auf den aktuellen Zustand der \"verfügbaren Coins\". Es ist ein zustandsbehafteter Befehl, d.h. es kann immer nur ein Scan laufen, der abgefragt und abgebrochen werden kann.\n\n### Wofür wird es verwendet?\n\n*   **Wallet-Wiederherstellung/Import:** Wenn du eine Wallet oder einen Deskriptor importierst, kannst du damit schnell prüfen, welche Coins aus diesem Deskriptor aktuell unspent sind, ohne die gesamte Blockchain scannen zu müssen.\n*   **Auditierung:** Überprüfe den aktuellen Kontostand von bestimmten Adressen oder Skripten im gesamten UTXO-Set.\n*   **Analyse:** Finde alle UTXOs, die einem bestimmten Muster entsprechen (z.B. alle P2TR-Outputs).\n\n### Aktionen (`action`)\n1.  `start`: Startet einen neuen Scan mit den angegebenen `scanobjects`. Gibt das Ergebnis erst zurück, wenn der Scan abgeschlossen ist.\n2.  `status`: Zeigt den Fortschritt des aktuell laufenden Scans in Prozent an. Gibt `null` zurück, wenn kein Scan läuft.\n3.  `abort`: Bricht den aktuell laufenden Scan ab. Gibt `true` zurück, wenn der Abbruch erfolgreich eingeleitet wurde.\n\n### Was ist das Ergebnis?\n\nDas Ergebnis hängt von der `action` ab:\n\n- **Bei `action = 'start'` (nach Abschluss):**\n```json\n{\n  \"success\": true,\n  \"txouts\": 85000000,\n  \"height\": 800000,\n  \"bestblock\": \"0000...\",\n  \"unspents\": [\n    {\n      \"txid\": \"...\",\n      \"vout\": 0,\n      \"scriptPubKey\": \"...\",\n      \"desc\": \"addr(...)\",\n      \"amount\": 1.23,\n      \"height\": 750000\n    }\n  ],\n  \"total_amount\": 1.23\n}\n```\n\n- **Bei `action = 'status'` (während des Scans):**\n```json\n{\n  \"progress\": 45.5\n}\n```\n\n- **Bei `action = 'abort'`:**\n`true` oder `false`.\n\n### Wichtige Hinweise\n*   **Lange Laufzeit:** Das Scannen des gesamten UTXO-Sets kann je nach Systemleistung mehrere Minuten dauern. Es wird dringend empfohlen, den RPC-Timeout zu deaktivieren, z.B. mit `bitcoin-cli -rpcclienttimeout=0 scantxoutset ...`.\n*   **Kein Index erforderlich:** Im Gegensatz zu `scanblocks` benötigt dieser Befehl keinen speziellen Index wie `blockfilterindex` oder `txindex`.\n*   **Nur aktueller Zustand:** Der Befehl findet keine bereits ausgegebenen, historischen Transaktionen, sondern nur die, die zum Zeitpunkt des Scans Teil des UTXO-Sets sind.\n\n### Beispiele für die Kommandozeile\n```bash\n# Starte einen Scan für einen Deskriptor (ohne Timeout)\nbitcoin-cli -rpcclienttimeout=0 scantxoutset start '[\"addr(bc1qzl6nsgqzu89a66l50cvwapnkw5shh23zarqkw9)\"]'\n\n# Frage den Status des laufenden Scans ab\nbitcoin-cli scantxoutset status\n\n# Breche den laufenden Scan ab\nbitcoin-cli scantxoutset abort\n```"
    },
    "verifychain": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "checklevel",
            "type": "number",
            "required": false,
            "default": 3,
            "desc": "Wie gründlich die Blockverifizierung ist (0-4).",
            "placeholder": "3",
            "hint": "0=nur lesen, 1=Gültigkeit, 2=Undo-Daten, 3=Tip-Disconnect, 4=Reconnect. Höhere Level beinhalten niedrigere.",
            "options": [
              { "value": 0, "label": "0 - Blöcke von Festplatte lesen", "desc": "Liest nur die Blöcke von der Festplatte, ohne tiefere Prüfung." },
              { "value": 1, "label": "1 - Block-Gültigkeit prüfen", "desc": "Prüft die grundlegende Gültigkeit der Blöcke." },
              { "value": 2, "label": "2 - Undo-Daten prüfen", "desc": "Prüft die Undo-Daten, die für Reorganisationen benötigt werden." },
              { "value": 3, "label": "3 - Tip-Disconnect prüfen (Standard)", "desc": "Prüft, ob die letzten Blöcke korrekt von der Kette getrennt werden können." },
              { "value": 4, "label": "4 - Blöcke wieder verbinden", "desc": "Versucht, die Blöcke nach dem Trennen wieder zu verbinden." }
            ]
          },
          {
            "name": "nblocks",
            "type": "number",
            "required": false,
            "default": 6,
            "desc": "Anzahl der zu prüfenden Blöcke (Standard: 6, 0=alle).",
            "placeholder": "6",
            "hint": "Anzahl der Blöcke, die von der Spitze rückwärts geprüft werden. 0 prüft die gesamte Kette."
          }
        ],
        "rpcVersion": "0.9.0",
        "complexity": "high"
      },
      "title": "Blockchain-Integrität überprüfen",
      "short": "Überprüft die Integrität der Blockchain-Datenbank auf der Festplatte.",
      "examples": [
        "verifychain",
        "verifychain 4 100",
        "verifychain 3 0"
      ],
      "details": "### Was ist `verifychain`?\n\nDer Befehl `verifychain` ist ein Diagnosewerkzeug, das die auf der Festplatte gespeicherte Blockchain-Datenbank auf Fehler und Inkonsistenzen überprüft. Man kann es sich wie ein \"Festplatten-Überprüfungsprogramm\" speziell für die Blockchain-Daten vorstellen.\n\n### Wofür wird es verwendet?\n\n*   **Diagnose von Datenkorruption:** Wenn du vermutest, dass deine Blockchain-Daten beschädigt sein könnten (z.B. nach einem unerwarteten Herunterfahren des Systems oder bei Festplattenproblemen), kann dieser Befehl helfen, die Integrität zu überprüfen.\n*   **Regelmäßige Wartung:** Als Teil einer routinemäßigen Überprüfung, um sicherzustellen, dass der Node fehlerfrei arbeitet.\n\n### Parameter\n1.  `checklevel` (Zahl, optional, Standard: `3`): Bestimmt, wie tief und gründlich die Überprüfung sein soll. Jedes Level schließt die Prüfungen der vorherigen Level mit ein.\n    *   **Level 0:** Liest die Blöcke nur von der Festplatte, um grundlegende Lesefehler zu finden.\n    *   **Level 1:** Überprüft die grundlegende Gültigkeit der Blöcke.\n    *   **Level 2:** Überprüft die \"Undo\"-Daten, die notwendig sind, um Blöcke bei einer Ketten-Reorganisation rückgängig zu machen.\n    *   **Level 3 (Standard):** Überprüft zusätzlich, ob die letzten Blöcke an der Spitze der Kette korrekt von der Kette getrennt (\"disconnected\") werden können.\n    *   **Level 4:** Führt die umfassendste Prüfung durch und versucht, die getrennten Blöcke wieder mit der Kette zu verbinden.\n2.  `nblocks` (Zahl, optional, Standard: `6`): Die Anzahl der Blöcke, die von der Spitze der Kette rückwärts überprüft werden sollen.\n    *   Ein Wert von `0` weist den Node an, die *gesamte* Blockchain zu überprüfen, was extrem lange dauern kann.\n\n### Was ist das Ergebnis?\n\nEin einfacher boolescher Wert:\n*   `true`: Die Überprüfung wurde ohne Fehler abgeschlossen.\n*   `false`: Es wurde ein Fehler oder eine Inkonsistenz gefunden.\n\n**Wichtig:** Wenn das Ergebnis `false` ist, musst du die `debug.log`-Datei deines Nodes überprüfen. Dort findest du detaillierte Informationen über die Art und den Ort des Fehlers.\n\n### Wichtige Hinweise\n*   **Sehr zeitaufwändig:** Dieser Befehl kann, abhängig von `checklevel`, `nblocks` und der Leistung deines Systems, sehr lange dauern (von Minuten bis zu vielen Stunden oder sogar Tagen).\n*   **Node nicht ansprechbar:** Während der Überprüfung ist der Node möglicherweise für andere RPC-Aufrufe nicht ansprechbar.\n*   Führe diesen Befehl am besten aus, wenn der Node nicht für kritische Operationen benötigt wird.\n\n### Beispiele für die Kommandozeile\n```bash\n# Führe die Standardüberprüfung durch (Level 3, die letzten 6 Blöcke)\nbitcoin-cli verifychain\n\n# Führe die gründlichste Überprüfung für die letzten 100 Blöcke durch\nbitcoin-cli verifychain 4 100\n\n# Überprüfe die gesamte Blockchain mit Level 3 (kann sehr lange dauern!)\nbitcoin-cli verifychain 3 0\n```\n```bash\n# Beispiel mit curl\ncurl --user meinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"verifychain\", \"params\": [4, 100]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "verifytxoutproof": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "proof",
            "type": "string",
            "required": true,
            "desc": "Der hex-kodierte Beweis, der von gettxoutproof generiert wurde.",
            "placeholder": "z.B. 01000000...",
            "hint": "Füge den vollständigen hex-kodierten Beweisstring ein."
          }
        ],
        "rpcVersion": "0.12.0",
        "complexity": "medium"
      },
      "title": "UTXO-Beweis überprüfen",
      "short": "Überprüft einen Merkle-Beweis und gibt die darin bestätigten Transaktions-IDs zurück.",
      "examples": [
        "verifytxoutproof \"0100...\""
      ],
      "details": "### Was ist `verifytxoutproof`?\n\nDer Befehl `verifytxoutproof` ist das Gegenstück zu `gettxoutproof`. Er nimmt einen hex-kodierten Merkle-Beweis entgegen und überprüft dessen Gültigkeit. Ein Merkle-Beweis ist ein kryptographischer Nachweis, der belegt, dass eine oder mehrere Transaktionen in einem bestimmten Block enthalten sind, ohne dass man den gesamten Block benötigt.\n\n### Wofür wird es verwendet?\n\n*   **Simplified Payment Verification (SPV):** Dies ist der Hauptanwendungsfall. Eine Light-Wallet, die einen Beweis von einem Full Node erhalten hat, kann mit diesem Befehl sicherstellen, dass der Beweis korrekt ist und die Transaktion tatsächlich in der Blockchain verankert ist.\n*   **Validierung von Beweisen:** Jeder kann einen erhaltenen Beweis validieren, um die Inklusion einer Transaktion in einem Block zu bestätigen.\n\n### Parameter\n1.  `proof` (String, **erforderlich**): Der hex-kodierte Beweis, der zuvor mit `gettxoutproof` generiert wurde.\n\n### Was ist das Ergebnis?\n\nEin JSON-Array, das die IDs der Transaktionen (TXIDs) enthält, die durch den Beweis erfolgreich bestätigt wurden.\n\n```json\n[\n  \"txid1_die_bestaetigt_wurde\",\n  \"txid2_die_bestaetigt_wurde\"\n]\n```\n\n### Wichtige Hinweise\n*   **Fehler bei Ungültigkeit:** Wenn der Beweis ungültig ist oder der Block, auf den er sich bezieht, nicht in der besten Kette deines Nodes gefunden wird, löst der Befehl einen RPC-Fehler aus.\n*   **Gegenstück zu `gettxoutproof`:** Dieser Befehl ist dazu gedacht, die von `gettxoutproof` erzeugten Daten zu verarbeiten.\n\n### Beispiele für die Kommandozeile\n```bash\n# Überprüfe einen gegebenen Beweis\nbitcoin-cli verifytxoutproof \"der_hex_kodierte_beweis_string\"\n```\n```bash\n# Beispiel mit curl\ncurl --user meinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"verifytxoutproof\", \"params\": [\"der_hex_kodierte_beweis_string\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    }
};