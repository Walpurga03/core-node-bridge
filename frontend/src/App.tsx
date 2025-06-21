import appStyles from "./App.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import { RPC_CATEGORIES_KEYS } from "./rpcConfig";
import { rpcCommandsByCategory } from "./rpcConfig";
import { RpcCommandTerminal } from "./components/RpcCommandTerminal";
import ReactMarkdown from 'react-markdown';

const BACKEND_URL = "http://localhost:3000";

function App() {
  // Übersetzungsfunktion von i18next
  const { t, i18n } = useTranslation();

  // State für die Ergebnisse der RPC-Calls
  const [rpcResults, setRpcResults] = useState<Record<string, any>>({});
  // State für den Lade-Status der RPC-Calls
  const [rpcLoading, _setRpcLoading] = useState<Record<string, boolean>>({});
  const [rpcErrors, setRpcErrors] = useState<Record<string, string | null>>({}); // NEUER STATE
  // State für die aktuelle Ansicht (main, Kategorie, Kommando, More-Info)
  const [view, setView] = useState<string>("main");
  // State für den Parameter-Filter (null = alle)
  const [paramFilter, _setParamFilter] = useState<number | null>(null);

  // Helper function to parse command line input into arguments
  // This handles quoted strings to allow arguments with spaces.
  const parseCliInput = (input: string): string[] => {
    const args: string[] = [];
    // This regex will match:
    // - sequences of non-whitespace, non-quote characters
    // - sequences of characters inside double quotes
    // - sequences of characters inside single quotes
    const regex = /"[^"]+"|'[^']+'|\S+/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
      let arg = match[0];
      // Remove quotes from the beginning and end of the argument
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        arg = arg.substring(1, arg.length - 1);
      }
      args.push(arg);
    }
    return args;
  };

  // NEU: Funktion für Terminal-RPC-Calls (ohne State-Management)
  const handleTerminalRpc = async (cmd: string, args: string[]) => {
    return new Promise<any>((resolve, reject) => {
      const queryParams = new URLSearchParams();
      queryParams.set("method", cmd);
      args.forEach((param, index) => {
        queryParams.set(`param${index + 1}`, param);
      });
      const url = `${BACKEND_URL}/api/rpc?${queryParams.toString()}`;
      fetch(url)
        .then(async res => {
          if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.error?.message || errorData?.message || `HTTP error ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (data && data.error) reject(data.error);
          else resolve(data);
        })
        .catch(reject);
    });
  };

  // Sprachumschalter (optional)
  const switchLang = (lng: string) => i18n.changeLanguage(lng);

  // Hilfsfunktion: Prüft, ob view eine Kategorie ist
  const isCategory = (view: string): view is keyof typeof rpcCommandsByCategory =>
    Object.keys(rpcCommandsByCategory).includes(view);



  // Filterfunktion für Kommandos nach params
  function filterByParams(cmd: { key: string }) {
    const commandConfig = t(`commands.${cmd.key}`, { returnObjects: true }) as any; // NEUE VERSION
    const params = commandConfig?.meta?.params || [];
    interface RpcParam { required?: boolean; [key: string]: any; } // required optional machen
    const requiredCount = (params as RpcParam[]).filter(p => p.required).length;
    if (paramFilter === null) return true;
    return requiredCount === paramFilter;
  }

  // Alle Kommandos aus allen Kategorien mit Kategorie-Info
  const allCommands = Object.entries(rpcCommandsByCategory)
    .flatMap(([category, cmds]) => cmds.map(cmd => ({ ...cmd, category })));

  // Hole das aktuelle Kommando, auch wenn view auf "<key>_more" steht
  const commandKey = view.endsWith("_more") ? view.replace(/_more$/, "") : view;
  const currentCommand = allCommands.find(cmd => cmd.key === commandKey);

  // Zähle alle Kommandos (gesamt)
  const totalCommands = Object.values(rpcCommandsByCategory).reduce(
    (sum, cmds) => sum + cmds.length,
    0
  );

  // Zähle alle implementierten Kommandos (mit Komponente)
  function countImplementedCommands() {
    let count = 0;
    Object.values(rpcCommandsByCategory).forEach(category =>
      category.forEach(cmd => {
        const commandConfig = t(`commands.${cmd.key}`, { returnObjects: true }) as any; // NEUE VERSION
        if (commandConfig?.meta?.params !== undefined) count++;
      })
    );
    return count;
  }
  const implementedCommandsCount = countImplementedCommands();

  return (
    <div className={appStyles.container}>
      {/* Sprachumschalter */}
      <div style={{ textAlign: "right", width: '100%', maxWidth: '1200px', paddingBottom: "1rem" }}>
        <button className={appStyles.langButton} onClick={() => switchLang("de")}>DE</button>
        <button className={appStyles.langButton} onClick={() => switchLang("en")}>EN</button>
      </div>
      <h1>Bitcoin Core Node Bridge</h1>

      {/* Hauptmenü: Kategorien */}
      {view === "main" && (
        <div className={appStyles.card}>
          <h2>{t("mainView.title", "Kategorien")}</h2>
          
          <div className={appStyles.description} style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
            {t("info.commandsCount", { count: totalCommands })}
            <br />
            {t("mainView.implementedCommands", { count: implementedCommandsCount, defaultValue: "Davon implementiert: {{count}}" })}
          </div>

          <div className={appStyles.menuBig}>
            {RPC_CATEGORIES_KEYS.map(categoryKey => (
              <button
                key={categoryKey}
                onClick={() => setView(categoryKey)}
                className={appStyles.bigButton}
              >
                {t(`categories.${categoryKey}`)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Untermenü: Kommandos einer Kategorie */}
      {isCategory(view) && (() => {
        const categoryCommands = rpcCommandsByCategory[view] || [];
        const categoryTotalCommands = categoryCommands.length;
        const categoryImplementedCommands = categoryCommands.filter(cmd => {
          const commandConfig = t(`commands.${cmd.key}`, { returnObjects: true }) as any;
          return commandConfig?.meta?.params !== undefined;
        }).length;

        const filteredCommands = categoryCommands.filter(filterByParams);

        const groupCommandsByComplexity = (level: 'low' | 'medium' | 'high') =>
          filteredCommands.filter(cmd => {
            const config = t(`commands.${cmd.key}`, { returnObjects: true }) as any;
            return config?.meta?.complexity === level;
          });

        const lowComplexityCommands = groupCommandsByComplexity('low');
        const mediumComplexityCommands = groupCommandsByComplexity('medium');
        const highComplexityCommands = groupCommandsByComplexity('high');

        return (
          <div className={appStyles.card}>
            <h2>{t(`categories.${view}`)}</h2>

            <div className={appStyles.description} style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
              {t("info.commandsCount", { count: categoryTotalCommands })}
              <br />
              {t("mainView.implementedCommands", { count: categoryImplementedCommands, defaultValue: "Davon implementiert: {{count}}" })}
            </div>

            {filteredCommands.length > 0 ? (
              <div>
                {lowComplexityCommands.length > 0 && (
                  <>
                    <h3 className={appStyles.complexityHeader}>{t('complexity.low.title', 'Einfach')}</h3>
                    <p className={appStyles.description}>{t('complexity.low.description')}</p>
                    <div className={appStyles.menuBig} data-testid="command-menu-low">
                      {lowComplexityCommands.map(cmd => (
                        <button key={cmd.key} className={appStyles.bigButton} onClick={() => setView(cmd.key)}>
                          {t(`commands.${cmd.key}.title`)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {mediumComplexityCommands.length > 0 && (
                  <>
                    <h3 className={appStyles.complexityHeader}>{t('complexity.medium.title', 'Mittel')}</h3>
                    <p className={appStyles.description}>{t('complexity.medium.description')}</p>
                    <div className={appStyles.menuBig} data-testid="command-menu-medium">
                      {mediumComplexityCommands.map(cmd => (
                        <button key={cmd.key} className={appStyles.bigButton} onClick={() => setView(cmd.key)}>
                          {t(`commands.${cmd.key}.title`)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {highComplexityCommands.length > 0 && (
                  <>
                    <h3 className={appStyles.complexityHeader}>{t('complexity.high.title', 'Experten')}</h3>
                    <p className={appStyles.description}>{t('complexity.high.description')}</p>
                    <div className={appStyles.menuBig} data-testid="command-menu-high">
                      {highComplexityCommands.map(cmd => (
                        <button key={cmd.key} className={appStyles.bigButton} onClick={() => setView(cmd.key)}>
                          {t(`commands.${cmd.key}.title`)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className={appStyles.description} style={{ textAlign: 'center', marginTop: '2rem' }}>
                {t("info.noResults", "Keine Befehle für diesen Filter gefunden.")}
              </p>
            )}
            
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button
                className={appStyles.backButton}
                onClick={() => setView("main")}
              >
                ← {t("buttons.back")}
              </button>
            </div>
          </div>
        );
      })()}

      {/* Komponenten-Rendering: Hauptansicht eines Kommandos */}
      {currentCommand && !view.endsWith("_more") && (
        <div className={appStyles.card}>
          <RpcCommandTerminal
            commandConfig={t(`commands.${currentCommand.key}`, { returnObjects: true }) as { title?: string; short?: string; details?: string; examples?: string[]; }}
            loading={!!rpcLoading[currentCommand.key]}
            result={rpcResults[currentCommand.key]}
            error={rpcErrors[currentCommand.key] ?? undefined}
            onQuery={(input: string) => {
              const [cmd, ...args] = parseCliInput(input.trim());
              if (!cmd) return; // Do nothing if input is empty
              handleTerminalRpc(cmd, args)
                .then(res => setRpcResults(r => ({ ...r, [currentCommand.key]: res })))
                .catch(err => setRpcErrors(e => ({ ...e, [currentCommand.key]: err.message || String(err) })));
            }}
            t={t}
          />
          <button
            className={appStyles.backButton}
            onClick={() => setView(currentCommand.category || "main")}
            style={{ marginTop: "2rem", display: "block", marginLeft: "auto", marginRight: "auto" }}
          >
            ← {t("buttons.back")}
          </button>
        </div>
      )}

      {/* Komponenten-Rendering: More-Info-Ansicht */}
      {currentCommand && view.endsWith("_more") && ( // Vereinfachte Bedingung
        <div className={appStyles.card}>
          <h2>{t(`commands.${currentCommand.key}.title`)}</h2>
          {/* ALT: <pre className={appStyles.rpcOutput}> */}
          {/* NEU: ReactMarkdown verwenden */}
          <div className={appStyles.rpcOutput}> 
            <ReactMarkdown>{t(`commands.${currentCommand.key}.details`)}</ReactMarkdown>
          </div>
          <button
            className={appStyles.backButton}
            style={{ marginTop: "2rem", display: "block", marginLeft: "auto", marginRight: "auto"}}
            onClick={() => setView(currentCommand.key)}
          >
            ← {t("buttons.back")}
          </button>
        </div>
      )}

      {/* Terminal-Komponente */}
      {view === "terminal" && (
        <div className={appStyles.card}>
          <RpcCommandTerminal
            commandConfig={{}}
            loading={!!rpcLoading["terminal"]}
            result={rpcResults["terminal"]}
            error={rpcErrors["terminal"] ?? undefined}
            onQuery={(input: string) => {
              const [cmd, ...args] = parseCliInput(input.trim());
              if (!cmd) return; // Do nothing if input is empty
              handleTerminalRpc(cmd, args)
          .then(res => setRpcResults(r => ({ ...r, terminal: res })))
          .catch(err => setRpcErrors(e => ({ ...e, terminal: err.message || String(err) })));
            }}
            t={t}
          />
          <button
            className={appStyles.backButton}
            onClick={() => setView("main")}
            style={{ marginTop: "2rem" }}
          >
            ← {t("buttons.back")}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;