# Vorlage für ein Befehlsobjekt

Dieses Dokument beschreibt die Struktur eines einzelnen Befehlsobjekts, wie es in unserer Anwendung verwendet wird. Als Beispiel dient das Objekt für den RPC-Befehl `getmempoolancestors`.

## Gesamtstruktur

Jedes Befehlsobjekt ist ein Schlüssel-Wert-Paar innerhalb eines größeren Objekts (z.B. `blockchainCommands`). Der Schlüssel ist der Name des RPC-Befehls (z.B. `"getmempoolancestors"`). Der Wert ist ein Objekt mit der folgenden Struktur:

```typescript
"getmempoolancestors": {
  "meta": { /* ... Metadaten ... */ },
  "title": "getmempoolancestors",
  "short": "Kurzbeschreibung des Befehls.",
  "examples": [ /* ... Beispielaufrufe ... */ ],
  "details": "### Ausführliche Beschreibung im Markdown-Format"
}
```

---

### 1. `meta` (Objekt)

Das `meta`-Objekt enthält alle technischen Daten und Konfigurationen für die Benutzeroberfläche.

-   `category` (String): Die Kategorie, zu der der Befehl gehört (z.B. `blockchain`, `wallet`, `mining`).
-   `params` (Array von Objekten): Eine Liste aller Parameter, die der Befehl akzeptiert. Die Struktur jedes Parameter-Objekts wird unten detailliert beschrieben.
-   `rpcVersion` (String): Die Version von Bitcoin Core, in der dieser RPC-Befehl eingeführt wurde.
-   `complexity` (String): Eine subjektive Einschätzung der Komplexität des Befehls (`low`, `medium`, `high`).

#### Struktur eines `params`-Elements

Jedes Objekt im `params`-Array beschreibt einen einzelnen Parameter.

```typescript
{
  "name": "txid", // Name des Parameters
  "type": "string", // Datentyp (z.B. string, number, boolean, array, string|number)
  "required": true, // Ist der Parameter erforderlich? (true/false)
  "default": false, // Standardwert, falls optional
  "desc": "Die ID der Transaktion im Mempool.", // Kurze Beschreibung für die UI
  "placeholder": "z.B. 4a5e...", // Platzhalter für das Eingabefeld
  "hint": "Gib eine gültige Transaktions-ID ein...", // Zusätzlicher Hinweis für den Benutzer
  "validation": { // Validierungsregeln für das Frontend
    "pattern": "^[a-fA-F0-9]{64}$",
    "errorMessage": "TXID muss genau 64 hexadezimale Zeichen haben."
  }
}
```

-   **`validation` (Objekt, optional):** Enthält Regeln zur Überprüfung der Benutzereingabe.
    -   `pattern`: Ein regulärer Ausdruck zur Validierung von Strings.
    -   `errorMessage`: Die Fehlermeldung, die bei ungültiger Eingabe angezeigt wird.
    -   `min` / `max`: Für die Validierung von Zahlenbereichen.

---

### 2. `title` (String)

Der offizielle Name des RPC-Befehls. Wird als Hauptüberschrift für die Detailansicht verwendet.

-   **Beispiel:** `"getmempoolancestors"`

---

### 3. `short` (String)

Eine prägnante Ein-Satz-Beschreibung der Funktion des Befehls.

-   **Beispiel:** `"Gibt alle Vorgänger-Transaktionen (Ancestors) einer Transaktion im Mempool zurück."`

---

### 4. `examples` (Array von Strings)

Eine Liste von einfachen Kommandozeilen-Beispielen, die zeigen, wie der Befehl verwendet wird.

-   **Beispiel:**
    ```json
    [
      "getmempoolancestors 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
      "getmempoolancestors 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b true"
    ]
    ```

---

### 5. `details` (String)

Eine ausführliche Beschreibung im **Markdown-Format**. Diese Beschreibung sollte klar strukturiert sein und dem Benutzer alle notwendigen Informationen liefern.

**Empfohlene Struktur:**

1.  `### Was ist [Befehlsname]?`
    -   Eine leicht verständliche Erklärung, was der Befehl tut.
2.  `### Wofür wird es verwendet? (Was kann ich damit herausfinden?)`
    -   Praktische Anwendungsfälle und Beispiele.
3.  `### Parameter`
    -   Eine detaillierte Liste der Parameter (falls vorhanden).
4.  `### Was ist das Ergebnis?`
    -   Beschreibung der Rückgabewerte mit JSON-Beispielen.
5.  `### Wichtige Hinweise:`
    -   Besondere Hinweise, Voraussetzungen oder Einschränkungen.
6.  `### Beispiele für die Kommandozeile:`
    -   Vollständige `bitcoin-cli` und `curl` Beispiele.

---

## Vollständiges Beispielobjekt: `getmempoolancestors`

Hier ist das vollständige Objekt als Referenz.

````typescript
{
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
  "title": "getmempoolancestors",
  "short": "Gibt alle Vorgänger-Transaktionen (Ancestors) einer Transaktion im Mempool zurück.",
  "examples": [
    "getmempoolancestors 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
    "getmempoolancestors 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b true"
  ],
  "details": "### Was ist `getmempoolancestors`?\n\nStell dir eine Kette von unbestätigten Transaktionen vor, bei der eine Transaktion die Coins ausgibt, die eine andere gerade erst empfangen hat. Die vorhergehende Transaktion ist ein \"Vorgänger\" oder \"Ancestor\". Der Befehl `getmempoolancestors` spürt alle diese Vorgänger für eine bestimmte Transaktion im Mempool (dem Wartebereich für unbestätigte Transaktionen) auf.\n\n ### Wofür wird es verwendet? (Was kann ich damit herausfinden?)\n\n*   **Diagnose von \"feststeckenden\" Transaktionen:** Deine Transaktion wird nicht bestätigt? Vielleicht liegt es daran, dass einer ihrer Vorgänger eine zu niedrige Gebühr hat. Dieser Befehl hilft dir, den \"bremsenden\" Vorgänger zu identifizieren.\n*   **Analyse von Transaktionsketten:** Du kannst sehen, wie viele unbestätigte Transaktionen voneinander abhängen. Das ist entscheidend, um zu verstehen, warum Miner bestimmte Transaktionspakete auswählen.\n*   **Child-Pays-For-Parent (CPFP) verstehen:** Wenn eine Elterntransaktion eine niedrige Gebühr hat, kann man eine Kindtransaktion mit einer sehr hohen Gebühr erstellen. Miner betrachten die Gesamtgebühr von Kind und Eltern. `getmempoolancestors` hilft dir, diese Ketten zu sehen und die Gesamtgebühren (mit `verbose=true`) zu analysieren.\n\n ### Parameter \n1.  `txid` (String, **erforderlich**): Die ID der Transaktion, deren Vorgänger du finden möchtest. Sie muss sich im Mempool befinden.\n2.  `verbose` (Boolean, optional, Standard: `false`):\n    *   `false`: Gibt eine einfache Liste mit den IDs aller Vorgänger-Transaktionen zurück.\n    *   `true`: Gibt ein detailliertes JSON-Objekt für jeden Vorgänger zurück, mit Informationen zu Größe, Gebühren, Abhängigkeiten etc.\n\n ### Was ist das Ergebnis? \n\n-   **Bei `verbose = false` (Standard):** Ein Array von Transaktions-IDs.\n    ```json\n    [\n      \"vorgänger_txid_1\",\n      \"vorgänger_txid_2\"\n    ]\n    ```\n\n-   **Bei `verbose = true`:** Ein Objekt, bei dem jede Vorgänger-TXID ein Schlüssel zu einem weiteren Objekt mit detaillierten Informationen ist.\n    ```json\n    {\n      \"vorgänger_txid_1\": {\n        \"vsize\": 250, // Virtuelle Größe der Transaktion\n        \"time\": 1672531200, // Zeit, zu der sie in den Pool kam\n        \"height\": 800000, // Blockhöhe, als sie in den Pool kam\n        \"fees\": {\n          \"base\": 0.00005000, // Eigene Gebühr in BTC\n          \"ancestor\": 0.00012000 // Gesamtgebühr aller Vorgänger (inkl. dieser)\n        },\n        \"depends\": [\"noch_frühere_vorgänger_txid\"], // Direkte Eltern-Transaktionen\n        ...\n      }\n    }\n    ```\n\n ### Wichtige Hinweise: \n*   Der Befehl funktioniert nur, wenn die angegebene `txid` im Mempool deines Nodes vorhanden ist.\n*   Ein \"Ancestor\" ist jede Transaktion in der Kette vor der angegebenen Transaktion, die ebenfalls noch unbestätigt ist.\n\n ### Beispiele für die Kommandozeile:  \n```bash\n# Einfache Liste der Vorgänger-IDs\nbitcoin-cli getmempoolancestors \"deine_txid\"\n\n# Detaillierte Informationen zu allen Vorgängern\nbitcoin-cli getmempoolancestors \"deine_txid\" true\n```\n```bash\n# Beispiel mit curl\ncurl --user deinBenutzer --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getmempoolancestors\", \"params\": [\"deine_txid\", true]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
}