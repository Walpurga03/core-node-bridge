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
    "getblocktemplate": {
      "meta": {
        "category": "mining",
        "params": [
          {
            "name": "template_request",
            "type": "object",
            "required": true,
            "description": "Objekt mit Einstellungen für die Blockvorlage. Mindestens das Feld \"rules\" (z.B. [\"segwit\"]) ist erforderlich.",
            "fields": [
              {
                "name": "mode",
                "type": "string",
                "required": false,
                "description": "Legt fest, ob eine Blockvorlage (\"template\") oder ein Blockvorschlag (\"proposal\") angefordert wird."
              },
              {
                "name": "capabilities",
                "type": "string[]",
                "required": false,
                "description": "Liste unterstützter Features des Clients, z.B. \"longpoll\", \"proposal\"."
              },
              {
                "name": "rules",
                "type": "string[]",
                "required": true,
                "description": "Liste von Regeln, die der Client unterstützt (z.B. [\"segwit\"])."
              },
              {
                "name": "longpollid",
                "type": "string",
                "required": false,
                "description": "ID für Longpolling-Anfragen, um auf neue Blöcke zu warten."
              },
              {
                "name": "data",
                "type": "hex",
                "required": false,
                "description": "Hex-kodierte Blockdaten für Modus \"proposal\"."
              }
            ]
          }
        ],
        "rpcVersion": "0.7.0",
        "complexity": "high"
      },
      "title": "Blockvorlage anfordern (getblocktemplate)",
      "short": "Liefert alle Daten, die ein Miner benötigt, um einen neuen Block zu bauen oder vorzuschlagen.",
      "examples": [
        "getblocktemplate '{\"rules\": [\"segwit\"]}'",
        "getblocktemplate '{\"mode\": \"proposal\", \"data\": \"<hex>\"}'"
      ],
      "details": `### Was ist \`getblocktemplate\`?

Mit diesem Befehl erhältst du eine Blockvorlage, die alle nötigen Informationen enthält, um einen neuen Block zu minen oder einen Blockvorschlag zu prüfen. Der Befehl ist zentral für das Mining und folgt den Spezifikationen der BIPs 22, 23, 9 und 145.

**Parameter:**
- \`template_request\` (Objekt, erforderlich): Enthält Einstellungen wie "rules" (z.B. ["segwit"]), "mode" ("template" oder "proposal"), "capabilities", "longpollid" und ggf. "data" (für Blockvorschläge).

**Typische Anwendungsfälle:**
- Mining-Software ruft regelmäßig \`getblocktemplate\` auf, um aktuelle Blockdaten zu erhalten.
- Pools oder Miner prüfen mit Modus "proposal" einen Blockvorschlag auf Gültigkeit.

**Ergebnis:**
- Im Modus "proposal": \`null\` (bei Erfolg) oder ein Fehlerstring.
- Im Standardmodus: Ein komplexes JSON-Objekt mit allen nötigen Feldern für das Mining, z.B. Version, Regeln, Transaktionen, Ziel, Blockhöhe, Limits, usw.

**Beispiel für das Ergebnis (gekürzt):**
\`\`\`json
{
  "version": 536870912,
  "rules": ["segwit"],
  "vbavailable": { "testdummy": 0 },
  "capabilities": ["proposal"],
  "previousblockhash": "00000000...",
  "transactions": [ { "data": "...", "txid": "...", ... } ],
  "coinbasevalue": 625000000,
  "target": "0000000...",
  "height": 850001,
  ...
}
\`\`\`

**Weitere Infos:**  
Siehe die BIPs:  
- [BIP22](https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki)  
- [BIP23](https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki)  
- [BIP9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes)  
- [BIP145](https://github.com/bitcoin/bips/blob/master/bip-0145.mediawiki)

**Beispiele für die Kommandozeile:**
\`\`\`bash
bitcoin-cli getblocktemplate '{"rules": ["segwit"]}'
bitcoin-cli getblocktemplate '{"mode": "proposal", "data": "<hex>"}'
\`\`\`
\`\`\`bash
curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method": "getblocktemplate", "params": [{"rules": ["segwit"]}]}' -H 'content-type: application/json' http://127.0.0.1:8332/
\`\`\`
`
    },
    "getnetworkhashps": {
  "meta": {
    "category": "mining",
    "params": [
      {
        "name": "nblocks",
        "type": "number",
        "required": false,
        "description": "Anzahl der Blöcke, aus denen der Durchschnitt berechnet wird (Standard: 120, -1 = seit letzter Schwierigkeitsanpassung)."
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "description": "Blockhöhe, für die die Netzwerk-Hashrate geschätzt werden soll (Standard: -1 = aktueller Block)."
      }
    ],
    "rpcVersion": "0.9.0",
    "complexity": "low"
  },
  "title": "Netzwerk-Hashrate schätzen (getnetworkhashps)",
  "short": "Schätzt die aktuelle Netzwerk-Hashrate (Hashes pro Sekunde) anhand der letzten Blöcke.",
  "examples": [
    "getnetworkhashps",
    "getnetworkhashps 120",
    "getnetworkhashps 120 700000"
  ],
  "details": `### Was ist \`getnetworkhashps\`?

Mit diesem Befehl kannst du die geschätzte Hashrate des gesamten Bitcoin-Netzwerks berechnen lassen – also wie viele Hashes pro Sekunde aktuell im Netzwerk erzeugt werden.

**Parameter:**
- \`nblocks\` (Zahl, optional, Standard: 120): Anzahl der letzten Blöcke, die für die Schätzung verwendet werden. Mit -1 wird seit der letzten Schwierigkeitsanpassung gerechnet.
- \`height\` (Zahl, optional, Standard: -1): Blockhöhe, für die die Schätzung gelten soll. Standard ist der aktuelle Block.

**Ergebnis:**
Eine Zahl, die die geschätzte Netzwerk-Hashrate in Hashes pro Sekunde angibt, z.B.:
\`\`\`
1.23456789e+20
\`\`\`

**Beispiele für die Kommandozeile:**
\`\`\`bash
bitcoin-cli getnetworkhashps
bitcoin-cli getnetworkhashps 120
bitcoin-cli getnetworkhashps 120 700000
\`\`\`
\`\`\`bash
curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method": "getnetworkhashps", "params": []}' -H 'content-type: application/json' http://127.0.0.1:8332/
\`\`\`
`
    },
    "prioritisetransaction": {
      "meta": {
        "category": "mining",
        "params": [
          {
            "name": "txid",
            "type": "string",
            "required": true,
            "description": "Die Transaktions-ID, deren Priorität geändert werden soll."
          },
          {
            "name": "dummy",
            "type": "number",
            "required": false,
            "description": "Nur für Kompatibilität, muss 0 oder null sein. (Veraltet, kann    weggelassen werden.)"
          },
          {
            "name": "fee_delta",
            "type": "number",
            "required": true,
            "description": "Wert (in Satoshis), um den die absolute Gebühr der Transaktion erhöht     oder verringert wird. Kein Fee-Rate-Wert!"
          }
        ],
        "rpcVersion": "0.10.0",
        "complexity": "medium"
      },
      "title": "Transaktionspriorität anpassen (prioritisetransaction)",
      "short": "Erhöht oder verringert die Priorität einer Transaktion für das Mining.",
      "examples": [
        "prioritisetransaction \"txid\" 0 10000",
        "prioritisetransaction \"txid\" null -5000"
      ],
      "details": `### Was ist \`prioritisetransaction\`?
    
    Mit diesem Befehl kannst du die Priorität einer bestimmten Transaktion für das Mining gezielt     erhöhen oder verringern. Das ist nützlich, wenn du möchtest, dass eine Transaktion bevorzugt    (oder weniger bevorzugt) in einen Block aufgenommen wird – unabhängig von ihrer tatsächlichen   Gebühr.
    
    **Parameter:**
    - \`txid\` (string, erforderlich): Die Transaktions-ID.
    - \`dummy\` (Zahl, optional): Nur für Kompatibilität, muss 0 oder null sein. (Veraltet, kann    weggelassen werden.)
    - \`fee_delta\` (Zahl, erforderlich): Wert in Satoshis, um den die absolute Gebühr der    Transaktion erhöht oder verringert wird. **Achtung:** Dies ist kein Fee-Rate-Wert, sondern ein    absoluter Wert. Die Gebühr wird nicht tatsächlich gezahlt, sondern nur für die Auswahl ins   Mining berücksichtigt.
    
    **Ergebnis:**
    - \`true\` oder \`false\` (Boolean), je nachdem, ob die Priorisierung erfolgreich war.
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli prioritisetransaction "txid" 0 10000
    bitcoin-cli prioritisetransaction "txid" null -5000
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "prioritisetransaction", "params": ["txid", 0.0, 10000]}' -H 'content-type: application/json'   http://127.0.0.1:8332/
    \`\`\`
    `
    },
    "submitblock": {
      "meta": {
        "category": "mining",
        "params": [
          {
            "name": "hexdata",
            "type": "string",
            "required": true,
            "description": "Hex-kodierte Blockdaten, die eingereicht werden sollen."
          },
          {
            "name": "dummy",
            "type": "string",
            "required": false,
            "description": "Nur für Kompatibilität mit BIP22, wird ignoriert."
          }
        ],
        "rpcVersion": "0.7.0",
        "complexity": "medium"
      },
      "title": "Neuen Block einreichen (submitblock)",
      "short": "Versucht, einen neuen Block ins Netzwerk einzureichen.",
      "examples": [
        "submitblock \"mydata\"",
        "submitblock \"mydata\" \"dummy\""
      ],
      "details": `### Was ist \`submitblock\`?
    
    Mit diesem Befehl kannst du einen neuen Block (hex-kodiert) an das Netzwerk übermitteln. Der    Block wird geprüft und – falls gültig – zur Blockchain hinzugefügt.
    
    **Parameter:**
    - \`hexdata\` (string, erforderlich): Die hex-kodierten Blockdaten.
    - \`dummy\` (string, optional): Nur für Kompatibilität mit BIP22, wird ignoriert.
    
    **Ergebnis:**
    - Bei Erfolg: \`null\`
    - Bei Fehler: Ein Fehlerstring gemäß BIP22.
    
    **Weitere Infos:**  
    Siehe [BIP22](https://en.bitcoin.it/wiki/BIP_0022) für Details.
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli submitblock "mydata"
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "submitblock", "params": ["mydata"]}' -H 'content-type: application/json' http://127.0.0.   1:8332/
    \`\`\`
    `
    },
    "submitheader": {
      "meta": {
        "category": "mining",
        "params": [
          {
            "name": "hexdata",
            "type": "string",
            "required": true,
            "description": "Hex-kodierte Block-Header-Daten, die eingereicht werden sollen."
          }
        ],
        "rpcVersion": "0.12.0",
        "complexity": "low"
      },
      "title": "Block-Header einreichen (submitheader)",
      "short": "Reicht einen Block-Header als möglichen neuen Chain-Tip ein.",
      "examples": [
        "submitheader \"aabbcc\""
      ],
      "details": `### Was ist \`submitheader\`?
    
    Mit diesem Befehl kannst du einen hex-kodierten Block-Header an den Node übermitteln. Ist der     Header gültig, wird er als möglicher neuer Chain-Tip akzeptiert. Bei ungültigen Daten gibt es     einen Fehler.
    
    **Parameter:**
    - \`hexdata\` (string, erforderlich): Die hex-kodierten Block-Header-Daten.
    
    **Ergebnis:**
    - Bei Erfolg: \`null\`
    - Bei Fehler: Ein Fehler wird ausgelöst.
    
    **Beispiele für die Kommandozeile:**
    \`\`\`bash
    bitcoin-cli submitheader "aabbcc"
    \`\`\`
    \`\`\`bash
    curl --user myusername --data-binary '{"jsonrpc": "2.0", "id": "curltest", "method":    "submitheader", "params": ["aabbcc"]}' -H 'content-type: application/json' http://127.0.0.  1:8332/
    \`\`\`
    `
    },
}