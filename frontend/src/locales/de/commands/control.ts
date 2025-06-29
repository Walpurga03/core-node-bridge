export const controlCommands = {
  "getmemoryinfo": {
    "meta": {
      "category": "control",
      "params": [
        {
          "name": "mode",
          "type": "string",
          "required": false,
          "description": "Bestimmt, welche Informationen zurückgegeben werden. Standard: \"stats\". Möglich: \"stats\" oder \"mallocinfo\"."
        }
      ],
      "rpcVersion": "0.10.0",
      "complexity": "low"
    },
    "title": "Speicherinformationen anzeigen",
    "short": "Zeigt Statistiken zur Speichernutzung oder detaillierte Heap-Informationen an.",
    "examples": [
      "getmemoryinfo",
      "getmemoryinfo \"mallocinfo\""
    ],
    "details": `### Was ist \`getmemoryinfo\`?

Mit diesem Befehl erhältst du Informationen über die Speichernutzung deines Bitcoin Core Daemons.

**Parameter:**
- \`mode\` (string, optional, Standard: "stats"): 
  - "stats": Zeigt allgemeine Statistiken zur Speichernutzung.
  - "mallocinfo": Gibt einen XML-String mit Low-Level-Heap-Informationen zurück (nur verfügbar, wenn mit glibc kompiliert).

**Ergebnis (Modus "stats"):**
\`\`\`json
{
  "locked": {
    "used": 123456,
    "free": 654321,
    "total": 777777,
    "locked": 777777,
    "chunks_used": 10,
    "chunks_free": 2
  }
}
\`\`\`

**Ergebnis (Modus "mallocinfo"):**
\`\`\"
"<malloc version=\"1\">...</malloc>"
\`\`\"

**Beispiele für die Kommandozeile:**
\`\`\`bash
bitcoin-cli getmemoryinfo
bitcoin-cli getmemoryinfo "mallocinfo"
\`\`\`
\`\`\`bash
curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method": "getmemoryinfo", "params": []}' -H 'content-type: application/json' http://127.0.0.1:8332/
\`\`\`
`
  },
  "getrpcinfo": {
    "meta": {
      "category": "control",
      "params": [],
      "rpcVersion": "0.17.0",
      "complexity": "low"
    },
    "title": "RPC-Server-Informationen",
    "short": "Zeigt Details zum aktuellen Zustand des RPC-Servers.",
    "examples": [
      "getrpcinfo"
    ],
    "details": "### Was ist `getrpcinfo`?\n\nMit diesem Befehl erhältst du Informationen über den aktuellen Zustand des RPC-Servers deines Bitcoin Core Nodes. Du kannst sehen, welche RPC-Befehle gerade aktiv sind und wie lange sie laufen. Außerdem wird dir der Pfad zur Debug-Logdatei angezeigt – wichtig für die Fehlersuche.\n\n**Typische Anwendungsfälle:**\n- Überblick über laufende RPC-Befehle\n- Pfad zur Logdatei für Support oder Analyse\n\n**Ergebnis:**\nEin JSON-Objekt mit aktiven Befehlen und dem Logdatei-Pfad.\n\n**Beispiel:**\n```json\n{\n  \"active_commands\": [\n    { \"method\": \"getblocktemplate\", \"duration\": 123456 }\n  ],\n  \"logpath\": \"/pfad/zum/debug.log\"\n}\n```\n\n**Kommandozeile:**\n```bash\nbitcoin-cli getrpcinfo\n```"
  },
  "help": {
    "meta": {
      "category": "control",
      "params": [
        {
          "name": "command",
          "type": "string",
          "required": false,
          "desc": "Name des Befehls",
          "placeholder": "z.B. getblockchaininfo",
          "hint": "Gib den Namen eines Befehls ein, um Hilfe dazu zu erhalten (optional)."
        }
      ],
      "rpcVersion": "0.1.0",
      "complexity": "low"
    },
    "title": "Hilfe anzeigen",
    "short": "Listet alle Befehle auf oder zeigt Hilfe zu einem bestimmten Befehl.",
    "examples": [
      "help",
      "help getblockchaininfo"
    ],
    "details": "### Was ist `help`?\n\nMit diesem Befehl kannst du dir eine Liste aller verfügbaren RPC-Befehle anzeigen lassen oder gezielt Hilfe zu einem bestimmten Befehl abrufen.\n\n**Parameter:**\n- `command` (optional): Name des Befehls, zu dem du Hilfe möchtest.\n\n**Ergebnis:**\nEin Hilfetext als Zeichenkette.\n\n**Kommandozeile:**\n```bash\nbitcoin-cli help\nbitcoin-cli help getblockchaininfo\n```"
  },
  "logging": {
    "meta": {
      "category": "control",
      "params": [
        {
          "name": "include",
          "type": "string[]",
          "required": false,
          "description": "Kategorien, die zum Debug-Logging hinzugefügt werden sollen (z.B. [\"all\"])."
        },
        {
          "name": "exclude",
          "type": "string[]",
          "required": false,
          "description": "Kategorien, die vom Debug-Logging entfernt werden sollen (z.B. [\"http\"])."
        }
      ],
      "rpcVersion": "0.17.0",
      "complexity": "medium"
    },
    "title": "Logging-Konfiguration anzeigen/ändern",
    "short": "Zeigt oder ändert, welche Debug-Log-Kategorien aktiv sind.",
    "examples": [
      "logging",
      "logging [\"all\"] [\"http\"]"
    ],
    "details": `### Was ist \`logging\`?

Mit diesem Befehl kannst du einsehen, welche Debug-Log-Kategorien aktuell aktiv sind – oder gezielt Logging-Kategorien ein- und ausschalten.

**Parameter:**
- \`include\` (Array, optional): Kategorien, die zum Debug-Logging hinzugefügt werden sollen (z.B. ["all"]).
- \`exclude\` (Array, optional): Kategorien, die vom Debug-Logging entfernt werden sollen (z.B. ["http"]).

Die Argumente werden der Reihe nach ausgewertet: Erst "include", dann "exclude". Wird eine Kategorie in beiden angegeben, ist sie am Ende **deaktiviert**.

**Gültige Kategorien:** addrman, bench, blockstorage, cmpctblock, coindb, estimatefee, http, i2p, ipc, leveldb, libevent, mempool, mempoolrej, net, proxy, prune, qt, rand, reindex, rpc, scan, selectcoins, tor, txpackages, txreconciliation, validation, walletdb, zmq  
Spezial: "all" oder "1" steht für alle Kategorien.

**Ergebnis:**  
Ein JSON-Objekt mit allen Kategorien und deren Status (true = aktiv, false = inaktiv):

\`\`\`json
{
  "net": true,
  "rpc": false,
  "mempool": true
}
\`\`\`

**Beispiele für die Kommandozeile:**
\`\`\`bash
bitcoin-cli logging
bitcoin-cli logging '["all"]' '["http"]'
\`\`\`
\`\`\`bash
curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method": "logging", "params": [["all"], ["libevent"]]}' -H 'content-type: application/json' http://127.0.0.1:8332/
\`\`\`
`
  },
  "stop": {
    "meta": {
      "category": "control",
      "params": [],
      "rpcVersion": "0.1.0",
      "complexity": "low"
    },
    "title": "Node stoppen",
    "short": "Fährt den Bitcoin Core Node sicher herunter.",
    "examples": [
      "stop"
    ],
    "details": "### Was ist `stop`?\n\nMit diesem Befehl kannst du deinen Bitcoin Core Node sicher und kontrolliert herunterfahren. Alle laufenden Prozesse werden beendet und der aktuelle Zustand gespeichert.\n\n**Ergebnis:**\nEine Bestätigung als Zeichenkette, z.B.:\n```\n\"Bitcoin Core stopping\"\n```\n\n**Hinweis:**\nNach Ausführung ist dein Node nicht mehr erreichbar, bis du ihn neu startest.\n\n**Kommandozeile:**\n```bash\nbitcoin-cli stop\n```"
  },
  "uptime": {
    "meta": {
      "category": "control",
      "params": [],
      "rpcVersion": "0.15.0",
      "complexity": "low"
    },
    "title": "Laufzeit anzeigen",
    "short": "Zeigt die gesamte Laufzeit des Servers in Sekunden.",
    "examples": [
      "uptime"
    ],
    "details": "### Was ist `uptime`?\n\nMit diesem Befehl erfährst du, wie viele Sekunden dein Bitcoin Core Node bereits läuft, seitdem er zuletzt gestartet wurde.\n\n**Ergebnis:**\nEine Zahl (Sekunden), z.B.:\n```\n123456\n```\n\n**Kommandozeile:**\n```bash\nbitcoin-cli uptime\n```"
  },
};