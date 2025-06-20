# MASTERPLAN: Bitcoin Core Node Bridge

## Ziel des Projekts

Eine moderne, modulare Brücke zwischen Bitcoin Core (RPC) und einem benutzerfreundlichen Web-Frontend.
Ziel ist es, alle wichtigen Bitcoin Core RPC-Kommandos (basierend auf Version 29.0) einfach, sicher und übersichtlich im Browser nutzbar zu machen.

**Besonderer Fokus:**  
Jeder RPC-Befehl soll im Frontend klar, verständlich und praxisnah beschrieben werden – inklusive Anwendungszweck, typischer Einsatzszenarien und Beispielaufrufen. So wird die Anwendung nicht nur ein Tool, sondern auch eine Lernhilfe für Nutzer aller Erfahrungsstufen.

---

## Aktueller Stand (Juni 2025)

- **Backend (Rust, Axum):**
  - Läuft stabil, Anbindung an Bitcoin Core via RPC.
  - **Universeller RPC-Handler (`/api/rpc`) implementiert**, der die meisten Bitcoin Core Befehle ohne spezifische Backend-Anpassungen unterstützt.
  - CORS, State-Management und grundlegende Fehlerbehandlung sind implementiert.
  - **Eine robuste Integrationstest-Suite (`cargo test`) wurde etabliert**, die die Stabilität der RPC-Bridge gegen einen `regtest`-Node sicherstellt.

- **Frontend (React, TypeScript):**
  - Übersetzungen (i18n) für EN/DE, dynamisch geladen.
  - Übersichtliche Menüstruktur nach Kategorien, dynamisch aus `rpcConfig.ts` generiert.
  - **Zentrale Komponente für alle RPC-Befehle:**
    - `RpcCommandTerminal.tsx`: Für Befehle mit und ohne Eingabeparameter, inkl. Beispiele, Markdown-Details und aufklappbarem Info-Bereich.
  - "More Info"-Ansicht mit ausführlichen Details (Markdown-fähig).
  - **Jeder Befehl erhält eine verständliche Beschreibung, Anwendungsbeispiele und Hinweise zum Einsatzzweck.**
  - Konsistentes, modernes Styling (SCSS Module).
  - Automatische Anzeige aller in `rpcConfig.ts` und `translation.ts` konfigurierten Kommandos.
  - **Alle Kommandos ohne Parameter sind bereits integriert und getestet.**
  - Die Integration von Kommandos mit Parametern erfolgt fortlaufend.

- **Dokumentation:**
  - Detaillierte Anleitung zum Hinzufügen neuer Kommandos (`ADD_NEW_COMMAND.md`), die den Fokus auf Konfiguration statt Programmierung legt.
  - **Projektstruktur-Übersicht in [`STRUKTUR.md`](STRUKTUR.md) – dort findest du jederzeit den aktuellen Aufbau und Zweck aller wichtigen Dateien.**
  - **Umfassende Anleitung zum Einrichten der Testumgebung in [`TESTING.md`](TESTING.md).**
  - Automatischer Übersetzungs-Check via Skript (`scripts/checkTranslations.js`).

---

## Nächste Schritte

Auf Basis des stabilen Fundaments sind die nächsten Schritte klar definiert:

1.  **Weitere Kommandos integrieren (Fokus auf Konfiguration):**
    *   Systematische Erweiterung der `rpcConfig.ts` und `translation.ts` Dateien, um die Abdeckung der Bitcoin Core RPC-API zu erhöhen.
    *   Die zentrale Komponente `RpcCommandTerminal.tsx` sollte die meisten neuen Befehle ohne zusätzliche React-Programmierung abdecken.
    *   Spezifische UI-Anpassungen oder neue Komponenten nur bei komplexen, nicht-standardmäßigen Anforderungen.
    *   **Jeder neue Befehl erhält eine prägnante, verständliche Beschreibung und mindestens ein Anwendungsbeispiel.**

2.  **Fehlerbehandlung & UX verbessern:**
    *   Detailliertere und benutzerfreundlichere Anzeige von API-Fehlern im Frontend.
    *   Verbesserung der Ladezustände und des visuellen Feedbacks.
    *   Ergänzung von Tooltips, kontextbezogenen Hilfetexten und Beispielen direkt in der UI, wo sinnvoll (ggf. über `translation.ts` steuerbar).
    *   Validierung von Eingabeparametern im Frontend verfeinern.

3.  **Sicherheit (Priorität):**
    *   Implementierung einer robusten Authentifizierungsmethode für den Zugriff auf das Web-Frontend und somit auf die RPC-Schnittstelle (z.B. Token-basiert, HTTP Basic Auth über HTTPS).
    *   Rate-Limiting im Backend, um Brute-Force-Angriffe und Überlastung zu verhindern.
    *   Erweitertes Logging im Backend für sicherheitsrelevante Ereignisse.
    *   Prüfung auf mögliche Injection-Risiken (obwohl der aktuelle Ansatz mit direkter RPC-Weiterleitung und typisierten Parametern dies minimieren sollte).

4.  **Deployment & Betrieb:**
    *   Erstellung einer detaillierten Anleitung für das Deployment der Anwendung (z.B. mit Docker, systemd).
    *   Bereitstellung von Beispiel-Konfigurationsdateien für verschiedene Umgebungen (Entwicklung, Produktion).
    *   Überlegungen zu Skalierbarkeit und Monitoring.

---

## Vision

- **Vollständige und aktuelle Abdeckung der Bitcoin Core RPC-API (Stand: Version 29.0).**
- **Jeder Befehl ist verständlich dokumentiert und mit Beispielen versehen.**
- **Eine intuitive, sichere und performante Web-Oberfläche, die auch für weniger technische Nutzer zugänglich ist.**
- **Hohe Erweiterbarkeit für zukünftige Bitcoin Core Versionen oder sogar alternative Node-Implementierungen mit kompatibler RPC-Schnittstelle.**
- **Mehrsprachigkeit und Fokus auf Barrierefreiheit.**
- **Eine solide Codebasis, die von der Community leicht verstanden und erweitert werden kann.**

---

## Wo stehen wir jetzt?

- **Ein stabiles Grundgerüst (MVP) ist implementiert und funktionsfähig.**
- **Die Architektur ermöglicht eine effiziente Erweiterung um neue RPC-Befehle durch Konfiguration.**
- **Die grundlegende Dokumentation und eine stabile Testinfrastruktur sind vorhanden und werden aktiv gepflegt.**
- **Alle Kommandos ohne Parameter sind bereits integriert und getestet.**
- **Die Integration von Kommandos mit Parametern erfolgt fortlaufend nach dem in `ADD_NEW_COMMAND.md` beschriebenen Schema.**
- **Alle Kommandos werden mit Beschreibung, Zweck und Beispielen dokumentiert.**

---

## Was als Nächstes tun? (Prioritäten)

1.  **Sicherheit und Authentifizierung implementieren.** (Höchste Priorität)
2.  Kontinuierlich weitere RPC-Befehle gemäß `ADD_NEW_COMMAND.md` integrieren – **inklusive Beschreibung und Anwendungsbeispielen**.
3.  UI/UX basierend auf Feedback und eigenen Tests verfeinern (insb. Fehlerbehandlung).

---

**Let’s build the best Bitcoin Core Web Bridge! 🚀**