export const signerCommands = {
     "enumeratesigners": {
      "meta": {
        "category": "signer",
        "params": [],
        "rpcVersion": "0.18.0",
        "complexity": "low"
      },
      "title": "enumeratesigners",
      "short": "Listet alle externen Signierer (z.B. Hardware Wallets), die mit -signer erkannt wurden.",
      "examples": [
        "enumeratesigners"
      ],
      "details": "### Was ist `enumeratesigners`?\n\nMit diesem Befehl erhältst du eine Liste aller externen Signierer (z.B. Hardware Wallets), die dein Bitcoin Core Node aktuell über die Option `-signer` erkennt. Jeder Signierer wird mit seinem Master-Key-Fingerprint und einem Gerätenamen angezeigt.\n\n**Wofür wird es verwendet? (Was kann ich damit herausfinden?):**\n\n*   **Verbundene Signierer anzeigen:** Prüfe, welche externen Geräte (z.B. Hardware Wallets) aktuell erkannt und genutzt werden können.\n*   **Geräte-Identifikation:** Jeder Eintrag enthält den eindeutigen Master-Key-Fingerprint und einen Namen, um das Gerät zu identifizieren.\n*   **Fehlersuche:** Hilfreich, wenn ein erwartetes Gerät nicht erkannt wird oder du die Verbindung testen möchtest.\n\n**Was ist das Ergebnis?**\n\nEin JSON-Objekt mit einer Liste aller gefundenen Signierer:\n```json\n{\n  \"signers\": [\n    {\n      \"fingerprint\": \"abcd1234\",\n      \"name\": \"Ledger Nano S\"\n    },\n    {\n      \"fingerprint\": \"ef567890\",\n      \"name\": \"Trezor Model T\"\n    }\n    // ...weitere Geräte...\n  ]\n}\n```\n\n> **Hinweis:**\n> \n> Falls du die Fehlermeldung erhältst:\n> \n> `Error: restart bitcoind with -signer=<cmd>`\n> \n> dann wurde dein Node **ohne** die Option `-signer` gestartet. Damit dieser Befehl funktioniert, musst du deinen Bitcoin Core Node mit einer passenden `-signer`-Option neu starten, z.B.:\n> \n> ```bash\n> bitcoind -signer=<pfad/zum/signierer-kommando>\n> ```\n\n**Beispiele für die Kommandozeile:**\n```bash\nbitcoin-cli enumeratesigners\n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"enumeratesigners\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
}