export const networkCommands = {
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
}
