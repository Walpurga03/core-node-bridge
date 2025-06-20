# STRUKTUR: Dateien & Zweck im Projekt

## Projektstruktur (Tree-Ansicht)

```text
core_node_bridge/
├── src/
│   ├── lib.rs                  # Haupt-Bibliothekscode (App-Erstellung)
│   └── main.rs                 # Einstiegspunkt Backend (Rust, Axum, API-Handler)
├── tests/
│   └── blockchain_query_tests.rs # Integrationstests für die RPC-Bridge
├── frontend/
│   └── src/
│       ├── App.module.scss     # Zentrales Styling
│       ├── App.tsx             # Haupt-React-Komponente, Navigation & State
│       ├── components/
│       │   └── RpcCommandTerminal.tsx # Zentrale UI-Komponente für alle Kommandos
│       ├── i18n.ts             # i18next-Konfiguration (Internationalisierung)
│       ├── index.css           # Globale CSS-Styles
│       ├── locales/
│       │   ├── de/
│       │   │   └── translation.ts  # Deutsche Übersetzungen & Befehlsdetails
│       │   └── en/
│       │       └── translation.ts  # Englische Übersetzungen & Befehlsdetails
│       ├── main.tsx            # Einstiegspunkt React, Initialisierung
│       ├── rpcConfig.ts        # Zentrale RPC-Befehls-Konfiguration & Kategorien
│       ├── types/
│       │   └── translations.d.ts   # TypeScript-Typen für Übersetzungen
│       └── vite-env.d.ts       # TypeScript-Deklarationen für Vite
├── docs/
│   ├── MASTERPLAN.md           # Überblick, Ziele, Stand, Vision
│   ├── ADD_NEW_COMMAND.md      # Schritt-für-Schritt-Anleitung für neue Kommandos
│   ├── TESTING.md              # Anleitung zum Ausführen der Tests
│   └── STRUKTUR.md             # (Diese Datei) Struktur & Zweck aller Dateien
├── .env.test                   # Umgebungsvariablen NUR für die Tests
├── package.json                # Frontend-Abhängigkeiten & Skripte (npm)
└── Cargo.toml                  # Backend-Abhängigkeiten & Build (Rust)
```

---

## 1. Backend (`/src`, `/tests`)

- **`src/main.rs`**: Einstiegspunkt des Backends (Rust, Axum). Stellt die HTTP-API bereit und startet den Server.
- **`src/lib.rs`**: Haupt-Bibliothekscode, der von `main.rs` und den Tests verwendet wird. Enthält die `create_app`-Funktion, die die gesamte Anwendungslogik (Routen, State, RPC-Client) initialisiert.
- **`tests/blockchain_query_tests.rs`**: Integrationstests, die das Backend gegen einen echten `bitcoind`-Prozess im `regtest`-Modus testen. Stellt die Stabilität und Korrektheit der RPC-Bridge sicher.

---

## 2. Frontend (`/frontend/src`)

- **`main.tsx`**
  Einstiegspunkt der React-Anwendung.
  Initialisiert das Root-Element und rendert die Hauptkomponente `App`.
  Integriert `StrictMode` und `Suspense` für das Laden von Übersetzungen.

- **`App.tsx`**
  Hauptkomponente der React-App.
  Steuert die Navigation zwischen verschiedenen Ansichten (Kategorien, Befehle, Detailansichten).
  Verwaltet den globalen Zustand (aktuelle Ansicht, Sprache, API-Ergebnisse).
  Ruft API-Endpunkte auf und leitet Daten an die entsprechenden UI-Komponenten weiter.
  Koordiniert die Internationalisierung (i18n) mit `react-i18next`.

- **`App.module.scss`**
  Zentrale SCSS-Datei für das Styling der `App`-Komponente und globaler Stile.
  Definiert Layout, Farbschemata, Button-Stile, Karten-Layouts etc.

- **`components/`**
  Verzeichnis für wiederverwendbare React-Komponenten.
  - **`RpcCommandTerminal.tsx`**: Zentrale Komponente zur Darstellung aller RPC-Befehle (mit und ohne Parameter). Zeigt Titel, Beschreibung, Beispiele, Eingabeformular, Ergebnis und ein aufklappbares "Mehr Infos"-Feld.

- **`rpcConfig.ts`**
  Definiert die Liste der verfügbaren RPC-Kategorien (`RPC_CATEGORIES_KEYS`).
  Enthält die Zuordnung von RPC-Befehlsschlüsseln zu ihren jeweiligen Kategorien (`rpcCommandsByCategory`).
  Diese Datei dient als zentrale Konfigurationsstelle, welche Befehle im Frontend bekannt sind und wie sie gruppiert werden.

- **`i18n.ts`**
  Konfigurationsdatei für `i18next` und `react-i18next`.
  Initialisiert die Internationalisierungsbibliothek, definiert die unterstützten Sprachen, Standard-Namespace und das Backend zum Laden der Übersetzungsdateien.

- **`locales/`**
  Verzeichnis für die Übersetzungsdateien.
  - **`de/translation.ts`**: Deutsche Übersetzungen. Enthält Texte für UI-Elemente, Kategorienamen, Befehlsdetails (Titel, Kurzbeschreibung, ausführliche Details) und die Konfiguration der Parameter für die Kommandos (Parametername, Typ, Beschreibung, Platzhalter, Validierungsregeln etc.).
  - **`en/translation.ts`**: Englische Übersetzungen mit derselben Struktur wie die deutsche Datei.

- **`types/`**
  TypeScript-Typdefinitionen für Übersetzungen und ggf. weitere Strukturen.

- **`index.css`**
  Globale CSS-Datei, die grundlegende Styles für die gesamte Anwendung bereitstellt (z.B. Body-Styles, Schriftarten-Reset, etc.). Wird in `main.tsx` importiert.

- **`vite-env.d.ts`**
  TypeScript-Deklarationsdatei für Umgebungsvariablen, die von Vite bereitgestellt werden.
  Hilft bei der Typüberprüfung für Vite-spezifische Features wie `import.meta.env`.

---

## 3. Dokumentation (`/docs`)

- **MASTERPLAN.md**  
  Überblick, Ziele, aktueller Stand, nächste Schritte, Vision.

- **ADD_NEW_COMMAND.md**  
  Schritt-für-Schritt-Anleitung zum Hinzufügen neuer RPC-Kommandos.

- **TESTING.md**
  Anleitung zum Einrichten der Testumgebung und Ausführen der Tests.

- **STRUKTUR.md**  
  (Diese Datei) Übersicht aller wichtigen Dateien und deren Zweck.

---

## 4. Sonstiges

- **.env.test**  
  Umgebungsvariablen **ausschließlich** für die Backend-Tests (`cargo test`), z.B. RPC-Zugangsdaten für den `regtest`-Node.

- **package.json / Cargo.toml**  
  Abhängigkeiten und Build-Skripte für Frontend (npm) und Backend (Rust).

---

## Hinweise

- **Jede Datei ist klar einem Zweck zugeordnet.**
- **Neue Kommandos werden primär in `rpcConfig.ts` (Zuordnung) und `translation.ts` (Details, Parameter) konfiguriert.**
- **Dokumentation ist direkt im Projekt integriert.**

---

## Fortschritt & Vorgehen beim Einpflegen der Kommandos

- **Stand Juni 2025:**  
  Alle Bitcoin Core RPC-Kommandos, die keine Argumente/Parameter benötigen, sind vollständig im Frontend konfiguriert und getestet.
- **Vorgehen:**  
  1. Kommandos ohne Parameter werden zuerst eingepflegt (siehe `translation.ts`).
  2. Kommandos mit Parametern folgen, jeweils mit vollständiger Parameterdefinition.
  3. Die Zuordnung zu Kategorien erfolgt in `rpcConfig.ts`.
  4. Die generische Komponente `RpcCommandTerminal.tsx` deckt die meisten Anwendungsfälle ab.
- **Dokumentation:**  
  Das genaue Vorgehen ist in `docs/ADD_NEW_COMMAND.md` beschrieben.

---

**Diese Übersicht hilft dir, dich im Projekt schnell zurechtzufinden und gezielt Änderungen vorzunehmen!**