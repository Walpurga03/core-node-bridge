export const controlCommands = {
    "getrpcinfo": {
      "meta": {
        "category": "control",
        "params": [],
        "rpcVersion": "0.17.0",
        "complexity": "low"
      },
      "title": "getrpcinfo",
      "short": "Gibt Details zum RPC-Server zurück.",
      "examples": [
        "getrpcinfo"
      ],
      "details": "### Was ist `getrpcinfo`?\n\nDer Befehl `getrpcinfo` liefert Informationen über den aktuellen Zustand des RPC-Servers (Remote Procedure Call) deines Bitcoin Core Nodes. Der RPC-Server ist die Schnittstelle, über die du Befehle an deinen Node sendest und Antworten erhältst, sei es über `bitcoin-cli` oder andere Anwendungen.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Aktive Befehle überwachen:** Du kannst sehen, welche RPC-Befehle gerade auf dem Server ausgeführt werden und wie lange sie schon laufen. Das kann nützlich sein, um langlaufende Operationen zu identifizieren oder um zu sehen, ob der RPC-Server stark ausgelastet ist.\n*   **Pfad zur Log-Datei finden:** Der Befehl zeigt dir den vollständigen Pfad zur Debug-Log-Datei (`debug.log`) deines Nodes. Diese Datei ist sehr wichtig für die Fehlersuche und detaillierte Analyse des Node-Verhaltens.\n\n**Was ist das Ergebnis?**\n\nDu erhältst ein JSON-Objekt mit zwei Hauptfeldern:\n\n```json\n{\n  \"active_commands\": [\n    // (JSON-Array) Eine Liste aller RPC-Befehle, die gerade aktiv sind.\n    {\n      \"method\": \"getblocktemplate\", \n      // (String) Der Name des RPC-Befehls (z.B. \"getblocktemplate\").\n      \"duration\": 123456 \n      // (Numerisch) Die bisherige Laufzeit des Befehls in Mikrosekunden.\n    }\n    // ... weitere aktive Befehle können hier gelistet sein ...\n  ],\n  \"logpath\": \"/pfad/zum/bitcoin/datenverzeichnis/debug.log\" \n  // (String) Der vollständige Dateipfad zur Debug-Log-Datei.\n}\n```\n\n**Wichtige Hinweise:**\n*   **`active_commands`:** Diese Liste kann leer sein, wenn gerade keine RPC-Befehle ausgeführt werden. Die `duration` wird in Mikrosekunden angegeben (1.000.000 Mikrosekunden = 1 Sekunde).\n*   **`logpath`:** Der Pfad zur `debug.log` ist nützlich, um auf detaillierte Protokollinformationen des Nodes zuzugreifen, insbesondere bei der Fehlersuche.\n*   Der Befehl benötigt keine Parameter.\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli getrpcinfo\n```\n```bash\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getrpcinfo\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
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
      "title": "help",
      "short": "Listet alle Befehle auf oder zeigt Hilfe zu einem bestimmten Befehl.",
      "examples": [
        "help",
        "help getblockchaininfo"
      ],
      "details": "### Was ist `help`?\n\nMit dem Befehl `help` kannst du dir eine Liste aller verfügbaren     RPC-Befehle anzeigen lassen oder detaillierte Hilfe zu einem bestimmten Befehl abrufen.   \n\n**Parameter:**\n1. `command` (String, optional): Der Name des Befehls, zu dem du Hilfe möchtest.    Wenn kein Parameter angegeben wird, werden alle verfügbaren Befehle aufgelistet.\n\n**Was ist das    Ergebnis?**\n\nDu erhältst einen Hilfetext als Zeichenkette (String).\n\n**Beispiele für die   Kommandozeile:**\n```bash\nbitcoin-cli help\nbitcoin-cli help getblockchaininfo\n```\n"
    },
    "stop": {
      "meta": {
      "category": "control",
      "params": [],
      "rpcVersion": "0.1.0",
      "complexity": "low"
      },
    "title": "stop",
    "short": "Fährt den Bitcoin Core Node kontrolliert herunter.",
    "examples": [
      "stop"
    ],
    "details": "### Was ist `stop`?\n\nMit dem Befehl `stop` kannst du deinen Bitcoin Core Node sicher und kontrolliert herunterfahren. Der Node beendet dabei alle laufenden Prozesse, speichert den aktuellen Zustand und schließt alle offenen Dateien.\n\n**Parameter:**\n\nKeine.\n\n**Was ist das Ergebnis?**\n\nDer Befehl gibt eine Zeichenkette zurück:\n```\n\"Bitcoin Core stopping\"\n```\n\n**Wichtige Hinweise:**\n*   Nach Ausführung dieses Befehls ist dein Node nicht mehr erreichbar, bis du ihn manuell neu startest.\n*   Verwende diesen Befehl, um Datenverlust oder Dateibeschädigungen zu vermeiden, anstatt den Node einfach zu beenden.\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli stop\n```"
    },
    "uptime": {
      "meta": {
      "category": "control",
      "params": [],
      "rpcVersion": "0.15.0",
      "complexity": "low"
      },
    "title": "uptime",
    "short": "Zeigt die gesamte Laufzeit des Servers in Sekunden an.",
    "examples": [
      "uptime"
    ],
    "details": "### Was ist `uptime`?\n\nMit dem Befehl `uptime` erhältst du die Anzahl der Sekunden, die dein Bitcoin Core Node bereits läuft, seitdem er zuletzt gestartet wurde.\n\n**Parameter:**\n\nKeine.\n\n**Was ist das Ergebnis?**\n\nEine Zahl (Sekunden), wie lange der Server schon läuft.\n\n```\n123456\n```\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli uptime\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"uptime\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
}