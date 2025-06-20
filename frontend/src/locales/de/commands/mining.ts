export const miningCommands = {
     "getmininginfo": {
      "meta": {
      "category": "mining",
      "params": [],
      "rpcVersion": "0.1.0",
      "complexity": "low"
      },
    "title": "getmininginfo",
    "short": "Zeigt aktuelle Informationen zum Mining-Status und Netzwerk.",
    "examples": [
      "getmininginfo"
    ],
    "details": "### Was ist `getmininginfo`?\n\nMit dem Befehl `getmininginfo` erhältst du ein JSON-Objekt mit aktuellen Informationen rund ums Mining und den Zustand des Netzwerks. Dazu gehören die aktuelle Blockhöhe, Schwierigkeitsgrad, Netzwerk-Hashrate, Größe des Mempools, Netzwerkname und ggf. spezielle Felder für Signet.\n\n**Parameter:**\n\nKeine.\n\n**Was ist das Ergebnis?**\n\nEin JSON-Objekt mit Feldern wie:\n- `blocks`: Aktuelle Blockhöhe\n- `currentblockweight`: Gewicht des letzten gebauten Blocks (optional)\n- `currentblocktx`: Anzahl Transaktionen im letzten Block (optional)\n- `bits`: Kompakte Darstellung des Schwierigkeitsziels\n- `difficulty`: Aktuelle Mining-Schwierigkeit\n- `target`: Aktuelles Ziel (hex)\n- `networkhashps`: Netzwerk-Hashrate\n- `pooledtx`: Anzahl Transaktionen im Mempool\n- `chain`: Netzwerkname (main, test, signet, regtest)\n- `signet_challenge`: Challenge für Signet (optional)\n- `next`: Informationen zum nächsten Block (optional)\n- `warnings`: Liste von Netzwerk-/Blockchain-Warnungen\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli getmininginfo\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getmininginfo\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getprioritisedtransactions": {
      "meta": {
        "category": "mining",
        "params": [],
        "rpcVersion": "25.0.0", // ab Bitcoin Core 25.0
        "complexity": "low"
      },
    "title": "getprioritisedtransactions",
    "short": "Zeigt alle benutzerdefinierten Fee-Deltas (prioritisetransaction) nach Transaktions-ID.",
    "examples": [
      "getprioritisedtransactions"
    ],
    "details": "### Was ist `getprioritisedtransactions`?\n\nMit diesem Befehl erhältst du eine Übersicht aller Transaktionen, für die du mit `prioritisetransaction` eine Gebühr-Anpassung (Fee-Delta) vorgenommen hast. Für jede Transaktion wird angezeigt, wie hoch das Fee-Delta ist, ob sie sich aktuell im Mempool befindet und ggf. die modifizierte Gebühr.\n\n**Parameter:**\n\nKeine.\n\n**Was ist das Ergebnis?**\n\nEin JSON-Objekt, das für jede betroffene Transaktion (key = txid) ein weiteres Objekt mit folgenden Feldern enthält:\n- `fee_delta`: (Zahl) Die Gebühr-Anpassung in Satoshis\n- `in_mempool`: (Boolean) Gibt an, ob sich die Transaktion aktuell im Mempool befindet\n- `modified_fee`: (Zahl, optional) Die modifizierte Gebühr in Satoshis (nur wenn `in_mempool=true`)\n\n**Beispiel:**\n```json\n{\n  \"txid123...\": {\n    \"fee_delta\": 10000,\n    \"in_mempool\": true,\n    \"modified_fee\": 25000\n  },\n  \"txid456...\": {\n    \"fee_delta\": -5000,\n    \"in_mempool\": false\n  }\n}\n```\n\n**Hinweis:**\nWenn noch keine Priorisierung vorgenommen wurde, gibt der Befehl einfach ein leeres Objekt `{}` zurück.\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli getprioritisedtransactions\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getprioritisedtransactions\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
}