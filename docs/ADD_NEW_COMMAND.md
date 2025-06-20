# Anleitung: Neuen RPC-Befehl einpflegen

Diese Kurzanleitung beschreibt, wie du einen neuen Bitcoin Core RPC-Befehl in die "Bitcoin Core Node Bridge" integrierst (Stand: Version 29.0).

---

## 1. Backend

**Keine Änderungen nötig:**  
Das Backend leitet alle RPC-Befehle universell an Bitcoin Core weiter. Du kannst direkt mit dem Frontend fortfahren.

---

## 2. Frontend

### a) Befehl zu einer Kategorie zuordnen

1. Öffne `frontend/src/rpcConfig.ts`.
2. Füge den neuen Befehlsschlüssel (z.B. `"getmynewcommand"`) in der passenden Kategorie im Array `rpcCommandsByCategory` hinzu.

### b) Übersetzungen & Details anlegen

1. Öffne die Übersetzungsdateien:
    - `frontend/src/locales/de/translation.ts`
    - `frontend/src/locales/en/translation.ts`
2. Ergänze unter `commands` einen neuen Eintrag mit:
    - **meta**: Kategorie, Parameterdefinitionen (leeres Array bei keinen Parametern)
    - **title**: Titel für die UI
    - **short**: Kurzbeschreibung
    - **details**: Ausführliche Beschreibung (Markdown möglich)
    - **examples**: (optional) Array mit Beispielaufrufen

**Beispiel für einen Befehl ohne Parameter:**
```json
"getmynewcommand": {
  "meta": {
    "category": "util",
    "params": []
  },
  "title": "Get My New Command",
  "short": "Kurzbeschreibung.",
  "details": "Ausführliche Beschreibung und Beispiele.",
  "examples": [
    "getmynewcommand"
  ]
}
```

**Beispiel für einen Befehl mit Parametern:**  
Siehe bestehende Einträge in `translation.ts` für die genaue Struktur.

---

## 3. Testen

- Starte Backend und Frontend neu.
- Prüfe, ob der neue Befehl im Menü erscheint und korrekt funktioniert.

---

**Fertig!**  
Alle weiteren Details und Beispiele findest du in den bestehenden Übersetzungsdateien und in der [STRUKTUR.md](STRUKTUR.md).
