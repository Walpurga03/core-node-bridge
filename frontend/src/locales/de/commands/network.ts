export const networkCommands = {
    "addnode": {
      "meta": {
        "category": "network",
        "params": [
          {
            "name": "node",
            "type": "string",
            "required": true,
            "description": "Die Adresse des Peers, zu dem eine Verbindung aufgebaut oder entfernt     werden soll (z.B. \"192.168.0.6:8333\")."
          },
          {
            "name": "command",
            "type": "string",
            "required": true,
            "description": "'add' um einen Node hinzuzufügen, 'remove' um einen Node zu entfernen,    'onetry' für einen einmaligen Verbindungsversuch."
          },
          {
            "name": "v2transport",
            "type": "boolean",
            "required": false,
            "description": "Optional: Versucht, die Verbindung mit BIP324 v2 Transportprotokoll     aufzubauen (nur bei 'add' oder 'onetry')."
          }
        ],
        "rpcVersion": "0.7.0",
        "complexity": "medium"
      },
      "title": "Node hinzufügen/entfernen oder Verbindung testen",
      "short": "Fügt einen Node zur addnode-Liste hinzu, entfernt ihn oder testet eine Verbindung.    ",
      "examples": [
        "addnode \"192.168.0.6:8333\" \"onetry\"",
        "addnode \"192.168.0.6:8333\" \"add\" true",
        "addnode \"192.168.0.6:8333\" \"remove\""
      ],
      "details": `### Was ist \`addnode\`?
    
    Mit diesem Befehl kannst du gezielt einen Peer (Node) zu deiner addnode-Liste hinzufügen,     entfernen oder einmalig eine Verbindung zu ihm testen. Nodes, die mit \`addnode\` (oder     \`-connect\`) hinzugefügt wurden, sind vor DoS-Disconnects geschützt und müssen keine     vollständigen Nodes sein.
    
    **Parameter:**
    - \`node\` (string, erforderlich): Die Adresse des Peers (z.B. "192.168.0.6:8333").
    - \`command\` (string, erforderlich): "add" (hinzufügen), "remove" (entfernen), "onetry"    (einmalig verbinden).
    - \`v2transport\` (boolean, optional): Versucht, die Verbindung mit BIP324 v2     Transportprotokoll aufzubauen (nur bei "add" oder "onetry", Standard: wie per -v2transport    gesetzt).
    
    **Ergebnis:**
    - \`null\` bei Erfolg.
    
    **Hinweise:**
    - Die Anzahl gleichzeitiger addnode-Verbindungen ist auf 8 begrenzt und zählt nicht zu    -maxconnections.
    - Für "remove" wird \`v2transport\` ignoriert.
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli addnode "192.168.0.6:8333" "onetry" true
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "addnode", "params": ["192.168.0.6:8333", "onetry", true]}' -H 'content-type: application/  json' http://127.0.0.1:8332/
    \`\`\`
    `
    },
    "clearbanned": {
      "meta": {
        "category": "network",
        "params": [],
        "rpcVersion": "0.12.0",
        "complexity": "low"
      },
     "title": "clearbanned",
     "short": "Entfernt alle aktuell gesperrten (gebannten) IP-Adressen.",
      "examples": [
        "clearbanned"
      ],
     "details": "### Was ist `clearbanned`?\n\nMit diesem Befehl entfernst du alle aktuell gesperrten (gebannten) IP-Adressen und Netzwerke aus der Bannliste deines Bitcoin Core Nodes. Danach können diese Adressen wieder Verbindungen zu deinem Node aufbauen.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Verbindungsprobleme beheben:** Wenn Nodes oder Clients keine Verbindung mehr zu deinem Node aufbauen können, weil ihre IP-Adresse gebannt wurde, kannst du mit `clearbanned` alle Sperren aufheben und so die Erreichbarkeit wiederherstellen.\n*   **Fehlersuche und Netzwerk-Reset:** Nach Experimenten, Tests oder versehentlichen Bannungen kannst du mit diesem Befehl schnell alle Sperren zurücksetzen, ohne einzelne IPs manuell entfernen zu müssen.\n*   **Wartung und Administration:** Wenn du regelmäßig mit wechselnden Peers arbeitest oder dein Netzwerk-Setup änderst, hilft dir der Befehl, die Bannliste sauber zu halten.\n*   **Entwicklung und Testumgebungen:** Besonders in Testnetzen oder bei automatisierten Tests ist es praktisch, die Bannliste regelmäßig zu leeren, um unerwartete Verbindungsprobleme zu vermeiden.\n\n**Parameter:**\n\nKeine.\n\n**Was ist das Ergebnis?**\n\nDer Befehl gibt `null` zurück.\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli clearbanned\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"clearbanned\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "disconnectnode": {
      "meta": {
        "category": "network",
        "params": [
          {
            "name": "address",
            "type": "string",
            "required": false,
            "description": "Die IP-Adresse und Port des Peers, von dem die Verbindung getrennt    werden soll (z.B. \"192.168.0.6:8333\")."
          },
          {
            "name": "nodeid",
            "type": "number",
            "required": false,
            "description": "Die Node-ID des Peers (siehe getpeerinfo)."
          }
        ],
        "rpcVersion": "0.12.0",
        "complexity": "low"
      },
      "title": "Peer-Verbindung trennen",
      "short": "Trennt sofort die Verbindung zu einem bestimmten Peer.",
      "examples": [
        "disconnectnode \"192.168.0.6:8333\"",
        "disconnectnode \"\" 1"
      ],
      "details": `### Was ist \`disconnectnode\`?
    
    Mit diesem Befehl kannst du die Verbindung zu einem bestimmten Peer sofort trennen – entweder     über die Adresse oder die Node-ID.
    
    **Parameter:**
    - \`address\` (string, optional): Die IP-Adresse und Port des Peers. Wird bevorzugt, wenn     angegeben.
    - \`nodeid\` (Zahl, optional): Die Node-ID des Peers (siehe \`getpeerinfo\`). Wird verwendet,     wenn \`address\` leer ist oder nicht angegeben wird.
    
    > **Hinweis:** Es darf immer nur **einer** der beiden Parameter verwendet werden!
    
    **Ergebnis:**
    - \`null\` bei Erfolg.
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli disconnectnode "192.168.0.6:8333"
    bitcoin-cli disconnectnode "" 1
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "disconnectnode", "params": ["192.168.0.6:8333"]}' -H 'content-type: application/json' http://  127.0.0.1:8332/
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "disconnectnode", "params": ["", 1]}' -H 'content-type: application/json' http://127.0.0.   1:8332/
    \`\`\`
    `
    },
    "getaddednodeinfo": {
      "meta": {
        "category": "network",
        "params": [
          {
            "name": "node",
            "type": "string",
            "required": false,
            "description": "Falls angegeben, werden nur Informationen zu diesem Node angezeigt.     Sonst werden alle hinzugefügten Nodes gelistet."
          }
        ],
        "rpcVersion": "0.7.0",
        "complexity": "low"
      },
      "title": "Informationen zu hinzugefügten Nodes anzeigen",
      "short": "Zeigt Informationen zu allen per addnode hinzugefügten Peers (keine onetry-Nodes).    ",
      "examples": [
        "getaddednodeinfo",
        "getaddednodeinfo \"192.168.0.201\""
      ],
      "details": `### Was ist \`getaddednodeinfo\`?
    
    Mit diesem Befehl erhältst du Informationen zu allen Peers, die du mit \`addnode\` hinzugefügt    hast (außer "onetry"-Verbindungen). Du siehst, ob die Verbindung aktuell besteht und ggf.   Details zu den verbundenen Adressen.
    
    **Parameter:**
    - \`node\` (string, optional): Wenn angegeben, werden nur Informationen zu diesem Node    angezeigt. Sonst werden alle hinzugefügten Nodes gelistet.
    
    **Ergebnis:**
    Ein Array von Objekten mit folgenden Feldern:
    - \`addednode\`: Die Adresse des hinzugefügten Peers (wie bei \`addnode\` angegeben)
    - \`connected\`: Ob aktuell eine Verbindung besteht (true/false)
    - \`addresses\`: (nur wenn verbunden) Liste der verbundenen Adressen mit Richtung (inbound/   outbound)
    
    **Beispiel:**
    \`\`\`json
    [
      {
        "addednode": "192.168.0.201",
        "connected": true,
        "addresses": [
          {
            "address": "192.168.0.201:8333",
            "connected": "outbound"
          }
        ]
      }
    ]
    \`\`\`
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli getaddednodeinfo "192.168.0.201"
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "getaddednodeinfo", "params": ["192.168.0.201"]}' -H 'content-type: application/json' http://   127.0.0.1:8332/
    \`\`\`
    `
    },
    "getaddrmaninfo": {
      "meta": {
        "category": "network",
        "params": [],
        "rpcVersion": "25.0.0",
        "complexity": "low"
      },
    "title": "getaddrmaninfo",
    "short": "Zeigt Statistiken über die Adressverwaltung deines Nodes (Anzahl bekannter Peer-Adressen).",
    "examples": [
      "getaddrmaninfo"
    ],
    "details": "### Was ist `getaddrmaninfo`?\n\nMit diesem Befehl erhältst du einen Überblick über die Anzahl der bekannten Peer-Adressen, die dein Node verwaltet. Die Adressverwaltung (Address Manager) deines Bitcoin Core Nodes speichert Adressen potenzieller und bewährter Peers in sogenannten `new`- und `tried`-Tabellen, getrennt nach Netzwerktyp (z.B. IPv4, IPv6, Tor, I2P, CJDNS).\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Netzwerkdurchdringung analysieren:** Du siehst, wie viele verschiedene Peer-Adressen dein Node kennt und wie sie sich auf die verschiedenen Netzwerke verteilen.\n*   **Verbindungsqualität einschätzen:** Die `tried`-Tabelle enthält Adressen, zu denen dein Node bereits erfolgreich eine Verbindung hatte. Viele Einträge deuten auf eine gute Vernetzung hin.\n*   **Fehlersuche:** Wenn dein Node Verbindungsprobleme hat, kann ein Blick auf die Anzahl der bekannten Adressen helfen, Ursachen zu finden (z.B. zu wenige bekannte Peers).\n*   **Netzwerküberwachung:** Entwickler und Node-Betreiber können damit die Entwicklung und Diversität des eigenen Peer-Pools überwachen.\n\n**Was ist das Ergebnis?**\n\nEin JSON-Objekt, das für jeden Netzwerktyp (`ipv4`, `ipv6`, `onion`, `i2p`, `cjdns`, `all_networks`) die Anzahl der Adressen in den Tabellen `new`, `tried` und die Gesamtsumme (`total`) anzeigt.\n\n**Beispiel:**\n```json\n{\n  \"ipv4\": { \"new\": 123, \"tried\": 45, \"total\": 168 },\n  \"ipv6\": { \"new\": 12, \"tried\": 3, \"total\": 15 },\n  \"onion\": { \"new\": 8, \"tried\": 2, \"total\": 10 },\n  \"all_networks\": { \"new\": 143, \"tried\": 50, \"total\": 193 }\n}\n```\n\n**Wichtige Hinweise:**\n*   Die `new`-Tabelle enthält Adressen, die dein Node zwar kennt, aber noch nicht erfolgreich kontaktiert hat.\n*   Die `tried`-Tabelle enthält Adressen, zu denen bereits eine erfolgreiche Verbindung bestand.\n*   Die Summen helfen, die Größe und Qualität deines Peer-Pools einzuschätzen.\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli getaddrmaninfo\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getaddrmaninfo\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getconnectioncount": {
      "meta": {
        "category": "network",
        "params": [],
        "rpcVersion": "0.7.0",
        "complexity": "low"
      },
      "title": "Anzahl der Verbindungen anzeigen",
      "short": "Zeigt die Anzahl der aktiven Verbindungen zu anderen Nodes.",
      "examples": [
        "getconnectioncount"
      ],
      "details": `### Was ist \`getconnectioncount\`?
    
    Mit diesem Befehl erhältst du die aktuelle Anzahl der Verbindungen deines Nodes zu anderen    Peers im Netzwerk.
    
    **Parameter:**
    - Keine.
    
    **Ergebnis:**
    - Eine Zahl, die die aktuelle Anzahl der aktiven Verbindungen angibt.
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli getconnectioncount
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "getconnectioncount", "params": []}' -H 'content-type: application/json' http://127.0.0.1:8332/
    \`\`\`
    `
    },
    "getpeerinfo": {
      "meta": {
        "category": "network",
        "params": [],
        "rpcVersion": "0.7.0",
        "complexity": "medium"
      },
    "title": "getpeerinfo",
    "short": "Zeigt detaillierte Informationen zu allen aktuell verbundenen Netzwerk-Peers.",
    "examples": [
      "getpeerinfo"
    ],
    "details": "### Was ist `getpeerinfo`?\n\nMit diesem Befehl erhältst du eine detaillierte Liste aller aktuell verbundenen Peers (andere Nodes), mit denen dein Bitcoin Core Node direkt kommuniziert. Für jeden Peer werden zahlreiche technische Details angezeigt, darunter Verbindungsdaten, Netzwerktyp, Version, übertragenes Datenvolumen, Berechtigungen und vieles mehr.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Netzwerküberwachung:** Du kannst sehen, mit welchen Peers dein Node verbunden ist, über welche Netzwerke (IPv4, IPv6, Tor, I2P, CJDNS) und wie stabil diese Verbindungen sind.\n*   **Fehlersuche:** Hilfreich, um Verbindungsprobleme, ungewöhnliche Latenzen (Pingzeiten) oder auffällige Peers zu identifizieren.\n*   **Analyse der Peer-Qualität:** Prüfe, wie viele Daten gesendet/empfangen wurden, welche Dienste ein Peer unterstützt, ob er Transaktionen weiterleitet und welche Version er nutzt.\n*   **Sicherheitsüberblick:** Zeigt, ob spezielle Berechtigungen (wie `noban`, `forcerelay`, `bloomfilter`) für einen Peer gesetzt sind.\n*   **Verbindungsarten und Transportprotokolle:** Du siehst, ob die Verbindung inbound/outbound, manuell, als Feeler oder über BIP324 (verschlüsselt) läuft.\n\n**Was ist das Ergebnis?**\n\nEin JSON-Array, in dem jedes Objekt einen Peer beschreibt. Wichtige Felder sind:\n- `id`: Peer-Index\n- `addr`: IP-Adresse und Port des Peers\n- `network`: Netzwerktyp (z.B. ipv4, ipv6, onion)\n- `servicesnames`: Liste der angebotenen Dienste\n- `relaytxes`: Ob Transaktionen weitergeleitet werden\n- `lastsend`, `lastrecv`: Zeitpunkte der letzten Sende-/Empfangsaktivität\n- `bytessent`, `bytesrecv`: Übertragene Bytes\n- `pingtime`, `minping`: Pingzeiten (ms)\n- `version`, `subver`: Protokollversion und User-Agent des Peers\n- `inbound`: Richtung der Verbindung\n- `permissions`: Spezielle Berechtigungen\n- `connection_type`: Art der Verbindung (z.B. outbound-full-relay, inbound, manual, feeler)\n- `transport_protocol_type`: Transportprotokoll (v1, v2, detecting)\n\n**Beispiel:**\n```json\n[\n  {\n    \"id\": 1,\n    \"addr\": \"123.45.67.89:8333\",\n    \"network\": \"ipv4\",\n    \"servicesnames\": [\"NETWORK\", \"WITNESS\"],\n    \"relaytxes\": true,\n    \"lastsend\": 1718600000,\n    \"lastrecv\": 1718600050,\n    \"bytessent\": 123456,\n    \"bytesrecv\": 654321,\n    \"pingtime\": 35,\n    \"version\": 70016,\n    \"subver\": \"/Satoshi:25.0.0/\",\n    \"inbound\": false,\n    \"permissions\": [\"noban\"],\n    \"connection_type\": \"outbound-full-relay\",\n    \"transport_protocol_type\": \"v1\"\n  }\n  // ...weitere Peers...\n]\n```\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli getpeerinfo\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getpeerinfo\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getnettotals": {
      "meta": {
        "category": "network",
        "params": [],
        "rpcVersion": "0.7.0",
        "complexity": "low"
      },
      "title": "Netzwerk-Traffic-Statistiken anzeigen",
      "short": "Zeigt Statistiken zum gesamten Netzwerkverkehr deines Nodes.",
      "examples": [
        "getnettotals"
      ],
      "details": `### Was ist \`getnettotals\`?
    
    Mit diesem Befehl erhältst du eine Übersicht über den gesamten Netzwerkverkehr deines Bitcoin     Core Nodes – also wie viele Bytes insgesamt empfangen und gesendet wurden, sowie aktuelle     Zeit- und Upload-Limits.
    
    **Parameter:**
    - Keine.
    
    **Ergebnis:**
    - \`totalbytesrecv\`: Gesamtzahl der empfangenen Bytes
    - \`totalbytessent\`: Gesamtzahl der gesendeten Bytes
    - \`timemillis\`: Aktuelle Systemzeit (UNIX-Epoch in Millisekunden)
    - \`uploadtarget\`: Objekt mit Infos zu Upload-Limits (z.B. Zeitfenster, Ziel, ob Limit     erreicht, verbleibende Bytes/Sekunden)
    
    **Beispiel:**
    \`\`\`json
    {
      "totalbytesrecv": 123456789,
      "totalbytessent": 987654321,
      "timemillis": 1718600000000,
      "uploadtarget": {
        "timeframe": 86400,
        "target": 1073741824,
        "target_reached": false,
        "serve_historical_blocks": true,
        "bytes_left_in_cycle": 1048576000,
        "time_left_in_cycle": 3600
      }
    }
    \`\`\`
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli getnettotals
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "getnettotals", "params": []}' -H 'content-type: application/json' http://127.0.0.1:8332/
    \`\`\`
    `
    },
    "getnetworkinfo": {
      "meta": {
        "category": "network",
        "params": [],
        "rpcVersion": "0.9.2",
        "complexity": "medium"
      },
      "title": "Netzwerk-Statusinformationen anzeigen",
      "short": "Zeigt verschiedene Statusinformationen zum P2P-Netzwerk deines Nodes.",
      "examples": [
        "getnetworkinfo"
      ],
      "details": `### Was ist \`getnetworkinfo\`?
    
    Mit diesem Befehl erhältst du ein ausführliches Statusobjekt mit Informationen zum aktuellen    Zustand des P2P-Netzwerks deines Bitcoin Core Nodes.
    
    **Parameter:**
    - Keine.
    
    **Ergebnis:**  
    Ein JSON-Objekt mit u.a. folgenden Feldern:
    - \`version\`: Server-Version
    - \`subversion\`: Subversion-String
    - \`protocolversion\`: Protokollversion
    - \`localservices\`: Hex-String der angebotenen Netzwerkdienste
    - \`localservicesnames\`: Liste der angebotenen Dienste (lesbar)
    - \`localrelay\`: Ob Transaktionsweiterleitung angefordert wird
    - \`timeoffset\`: Zeitabweichung zum Netzwerk (Sekunden)
    - \`connections\`: Gesamtzahl der Verbindungen
    - \`connections_in\`: Eingehende Verbindungen
    - \`connections_out\`: Ausgehende Verbindungen
    - \`networkactive\`: Ob das P2P-Netzwerk aktiv ist
    - \`networks\`: Array mit Infos zu jedem Netzwerktyp (IPv4, IPv6, Tor, ...), inkl. Proxy,     Erreichbarkeit etc.
    - \`relayfee\`: Minimale Relay-Gebühr (BTC/kvB)
    - \`incrementalfee\`: Minimale Gebührenerhöhung für Mempool-Limitierung/Replacement (BTC/kvB)
    - \`localaddresses\`: Liste lokaler Adressen (mit Port und Score)
    - \`warnings\`: Liste aktueller Netzwerk- und Blockchain-Warnungen
    
    **Beispiel:**
    \`\`\`json
    {
      "version": 250000,
      "subversion": "/Satoshi:25.0.0/",
      "protocolversion": 70016,
      "localservices": "000000000000040d",
      "localservicesnames": ["NETWORK", "WITNESS", "NETWORK_LIMITED"],
      "localrelay": true,
      "timeoffset": 0,
      "connections": 12,
      "connections_in": 6,
      "connections_out": 6,
      "networkactive": true,
      "networks": [
        {
          "name": "ipv4",
          "limited": false,
          "reachable": true,
          "proxy": "",
          "proxy_randomize_credentials": false
        }
        // ...
      ],
      "relayfee": 0.00001000,
      "incrementalfee": 0.00001000,
      "localaddresses": [
        {
          "address": "203.0.113.42",
          "port": 8333,
          "score": 1
        }
      ],
      "warnings": []
    }
    \`\`\`
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli getnetworkinfo
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "getnetworkinfo", "params": []}' -H 'content-type: application/json' http://127.0.0.1:8332/
    \`\`\`
    `
    },
    "getnodeaddresses": {
      "meta": {
        "category": "network",
        "params": [
          {
            "name": "count",
            "type": "number",
            "required": false,
            "description": "Maximale Anzahl der zurückgegebenen Adressen (Standard: 1, 0 = alle)."
          },
          {
            "name": "network",
            "type": "string",
            "required": false,
            "description": "Optional: Nur Adressen des angegebenen Netzwerks (ipv4, ipv6, onion,    i2p, cjdns)."
          }
        ],
        "rpcVersion": "22.0.0",
        "complexity": "low"
      },
      "title": "Bekannte Node-Adressen abrufen",
      "short": "Gibt bekannte Peer-Adressen zurück, gefiltert nach Qualität und Aktualität.",
      "examples": [
        "getnodeaddresses 8",
        "getnodeaddresses 4 \"i2p\"",
        "getnodeaddresses 0",
        "getnodeaddresses 12 \"onion\""
      ],
      "details": `### Was ist \`getnodeaddresses\`?
    
    Mit diesem Befehl erhältst du eine Liste von bekannten Peer-Adressen, die dein Node     gespeichert hat. Die Adressen werden nach Qualität und Aktualität gefiltert und können genutzt    werden, um neue Peers im Netzwerk zu finden.
    
    **Parameter:**
    - \`count\` (Zahl, optional, Standard: 1): Maximale Anzahl der zurückgegebenen Adressen. 0    gibt alle bekannten Adressen zurück.
    - \`network\` (string, optional): Nur Adressen des angegebenen Netzwerks (z.B. "ipv4", "ipv6",    "onion", "i2p", "cjdns").
    
    **Ergebnis:**
    Ein Array von Objekten mit folgenden Feldern:
    - \`time\`: Zeitpunkt, wann der Node zuletzt gesehen wurde (UNIX-Zeitstempel)
    - \`services\`: Von diesem Node angebotene Dienste (als Bitfeld)
    - \`address\`: IP-Adresse oder Netzwerkadresse des Nodes
    - \`port\`: Portnummer
    - \`network\`: Netzwerktyp (ipv4, ipv6, onion, i2p, cjdns)
    
    **Beispiel:**
    \`\`\`json
    [
      {
        "time": 1718600000,
        "services": 9,
        "address": "203.0.113.42",
        "port": 8333,
        "network": "ipv4"
      }
    ]
    \`\`\`
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli getnodeaddresses 8
    bitcoin-cli getnodeaddresses 4 "i2p"
    bitcoin-cli -named getnodeaddresses network=onion count=12
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "getnodeaddresses", "params": [8]}' -H 'content-type: application/json' http://127.0.0.1:8332/
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "getnodeaddresses", "params": [4, "i2p"]}' -H 'content-type: application/json' http://127.0.0.  1:8332/
    \`\`\`
    `
    },
    "listbanned": {
      "meta": {
        "category": "network",
        "params": [],
        "rpcVersion": "0.12.0",
        "complexity": "low"
      },
      "title": "listbanned",
      "short": "Listet alle aktuell manuell gebannten IP-Adressen und Subnetze.",
      "examples": [
        "listbanned"
      ],
      "details": "### Was ist `listbanned`?\n\nMit diesem Befehl erhältst du eine Liste aller aktuell manuell gebannten IP-Adressen und Subnetze, die dein Bitcoin Core Node blockiert. Für jeden Eintrag werden Details wie die Adresse, das Erstellungsdatum des Banns, die Dauer und die verbleibende Zeit bis zum Ablauf angezeigt.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Überblick über aktive Banns:** Du siehst, welche IPs/Subnetze aktuell blockiert sind und wie lange der Bann noch gilt.\n*   **Netzwerkverwaltung:** Hilfreich, um versehentliche oder veraltete Banns zu erkennen und ggf. gezielt aufzuheben.\n*   **Fehlersuche:** Wenn Verbindungen von bestimmten Adressen nicht funktionieren, kannst du prüfen, ob diese gebannt sind.\n\n**Was ist das Ergebnis?**\n\nEin JSON-Array, in dem jedes Objekt einen Bann beschreibt:\n- `address`: Die gebannte IP-Adresse oder das Subnetz\n- `ban_created`: Zeitpunkt der Bann-Erstellung (Unix-Zeitstempel)\n- `banned_until`: Zeitpunkt, bis zu dem der Bann gilt (Unix-Zeitstempel)\n- `ban_duration`: Dauer des Banns in Sekunden\n- `time_remaining`: Verbleibende Zeit bis zum Ablauf in Sekunden\n\n**Beispiel:**\n```json\n[\n  {\n    \"address\": \"192.168.1.100\",\n    \"ban_created\": 1718600000,\n    \"banned_until\": 1718603600,\n    \"ban_duration\": 3600,\n    \"time_remaining\": 1800\n  }\n]\n```\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli listbanned\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"listbanned\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "ping": {
        "meta": {
        "category": "network",
        "params": [],
        "rpcVersion": "0.9.2",
        "complexity": "low"
        },
      "title": "ping",
      "short": "Sendet einen Ping an alle verbundenen Peers, um die Antwortzeiten zu messen.",
      "examples": [
        "ping"
      ],
      "details": "### Was ist `ping`?\n\nMit diesem Befehl forderst du deinen Node auf, einen Ping an alle aktuell verbundenen Peers zu senden. Das dient dazu, die Antwortzeiten (Latenzen) im Netzwerk zu messen. Die Ergebnisse werden **nicht direkt** von `ping` zurückgegeben, sondern erscheinen anschließend in den Feldern `pingtime` und `pingwait` bei jedem Peer im Ergebnis von `getpeerinfo`.\n\n> **Wichtig:**\n> \n> **Der Befehl `ping` gibt immer `null` zurück.**\n> \n> Das ist das erwartete Verhalten! Die eigentlichen Messwerte findest du nur über `getpeerinfo`.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Netzwerklatenz messen:** Du kannst herausfinden, wie schnell oder langsam die Kommunikation mit einzelnen Peers ist.\n*   **Netzwerk- und Node-Performance überwachen:** Da der Ping-Befehl in die normale Befehlswarteschlange eingereiht wird, misst er auch, wie ausgelastet dein Node gerade ist (nicht nur die reine Netzwerkverbindung).\n*   **Fehlersuche:** Bei Verbindungsproblemen oder auffällig hohen Latenzen kannst du gezielt einen neuen Ping auslösen und die Werte beobachten.\n\n**Was ist das Ergebnis?**\n\n> **Ergebnis:**\n> \n> ```\n> null\n> ```\n> \n> Der Befehl liefert **keine Daten zurück**. Die Ping-Zeiten findest du nach kurzer Zeit im Ergebnis von `getpeerinfo` unter den Feldern `pingtime` (letzte Ping-Zeit in Sekunden) und `pingwait` (falls ein Ping noch aussteht).\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli ping\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"ping\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```\n\n**Tipp:**\nUm die tatsächlichen Ping-Zeiten zu sehen, führe nach dem Ping-Befehl den Befehl `getpeerinfo` aus."
    },
    "setban": {
      "meta": {
        "category": "network",
        "params": [
          {
            "name": "subnet",
            "type": "string",
            "required": true,
            "description": "Die IP-Adresse oder das Subnetz (z.B. \"192.168.0.6\" oder \"192.168.0.   0/24\")."
          },
          {
            "name": "command",
            "type": "string",
            "required": true,
            "description": "'add' um eine IP/Subnetz zu bannen, 'remove' um einen Bann aufzuheben."
          },
          {
            "name": "bantime",
            "type": "number",
            "required": false,
            "description": "Optional: Zeit in Sekunden, wie lange die IP gebannt wird (Standard:    24h, 0 = Standardwert, kann mit -bantime überschrieben werden)."
          },
          {
            "name": "absolute",
            "type": "boolean",
            "required": false,
            "description": "Optional: Wenn true, wird bantime als absoluter UNIX-Zeitstempel    interpretiert."
          }
        ],
        "rpcVersion": "0.12.0",
        "complexity": "medium"
      },
      "title": "IP/Subnetz bannen oder Bann aufheben",
      "short": "Fügt eine IP/Subnetz zur Bannliste hinzu oder entfernt sie.",
      "examples": [
        "setban \"192.168.0.6\" \"add\" 86400",
        "setban \"192.168.0.0/24\" \"add\"",
        "setban \"192.168.0.6\" \"remove\""
      ],
      "details": `### Was ist \`setban\`?
    
    Mit diesem Befehl kannst du gezielt eine IP-Adresse oder ein Subnetz auf die Bannliste setzen     oder wieder entfernen. Das ist nützlich, um unerwünschte oder störende Verbindungen zu    blockieren.
    
    **Parameter:**
    - \`subnet\` (string, erforderlich): Die IP-Adresse oder das Subnetz (z.B. "192.168.0.6" oder     "192.168.0.0/24").
    - \`command\` (string, erforderlich): "add" (bannen), "remove" (Bann aufheben).
    - \`bantime\` (Zahl, optional): Zeit in Sekunden, wie lange die IP gebannt wird (Standard:    24h, 0 = Standardwert, kann mit -bantime überschrieben werden).
    - \`absolute\` (boolean, optional): Wenn true, wird \`bantime\` als absoluter UNIX-Zeitstempel    interpretiert.
    
    **Ergebnis:**
    - \`null\` bei Erfolg.
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli setban "192.168.0.6" "add" 86400
    bitcoin-cli setban "192.168.0.0/24" "add"
    bitcoin-cli setban "192.168.0.6" "remove"
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method": "setban",    "params": ["192.168.0.6", "add", 86400]}' -H 'content-type: application/json' http://127.0.0.   1:8332/
    \`\`\`
    `
    },
    "setnetworkactive": {
      "meta": {
        "category": "network",
        "params": [
          {
            "name": "state",
            "type": "boolean",
            "required": true,
            "description": "true um das Netzwerk zu aktivieren, false um jegliche     P2P-Netzwerkaktivität zu deaktivieren."
          }
        ],
        "rpcVersion": "0.9.0",
        "complexity": "low"
      },
      "title": "Netzwerkaktivität ein-/ausschalten",
      "short": "Aktiviert oder deaktiviert die gesamte P2P-Netzwerkaktivität des Nodes.",
      "examples": [
        "setnetworkactive true",
        "setnetworkactive false"
      ],
      "details": `### Was ist \`setnetworkactive\`?
    
    Mit diesem Befehl kannst du die gesamte P2P-Netzwerkaktivität deines Bitcoin Core Nodes     aktivieren oder deaktivieren.
    
    **Parameter:**
    - \`state\` (boolean, erforderlich): true um das Netzwerk zu aktivieren, false um es zu     deaktivieren.
    
    **Ergebnis:**
    - true oder false (je nachdem, was gesetzt wurde).
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli setnetworkactive true
    bitcoin-cli setnetworkactive false
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "setnetworkactive", "params": [true]}' -H 'content-type: application/json' http://127.0.0.  1:8332/
    \`\`\`
    `
    },
}
