import React, { useState } from "react";
import appStyles from "../App.module.scss";
import ReactMarkdown from "react-markdown";

interface RpcCommandTerminalProps {
  commandConfig: {
    title?: string;
    short?: string;
    details?: string;
    examples?: string[];
  };
  loading: boolean;
  result?: string | object;
  error?: string;
  onQuery: (input: string) => void;
  t: (key: string, fallback: string) => string;
}

export const RpcCommandTerminal = ({
  commandConfig,
  loading,
  result,
  error,
  onQuery,
  t,
}: RpcCommandTerminalProps) => {
  const [input, setInput] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuery(input);
  };

  return (
    <div>
      {/* Titel */}
      <h2 className={appStyles.commandTitle}>{commandConfig?.title}</h2>
      {/* Kurzbeschreibung */}
      <div className={appStyles.commandShort}>{commandConfig?.short}</div>

      {/* Mehr Infos (Details) */}
      <button
        className={appStyles.moreInfoButton}
        onClick={() => setShowDetails((v) => !v)}
        aria-expanded={showDetails}
      >
        {showDetails ? "Schließen" : "Mehr Infos"}
      </button>
      {showDetails && (
        <div className={appStyles.commandDetails}>
          <ReactMarkdown>
            {commandConfig?.details || ""}
          </ReactMarkdown>
        </div>
      )}

      {/* Terminal-Eingabe und Ergebnis im Fokus */}
      <div className={appStyles.terminalFocusBox}>
        <form className={appStyles.terminalForm} onSubmit={handleSubmit}>
          <span className={appStyles.terminalPrompt}>$</span>
          <input
            className={appStyles.terminalInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Parameter eingeben …"
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className={appStyles.bigButton}
            disabled={loading}
          >
            {loading ? "⏳" : t("buttons.query", "Abfragen")}
          </button>
        </form>
        {/* Ergebnis/Fehler */}
        {error && <div className={appStyles.error}>{error}</div>}
        {result && (
          <pre className={appStyles.terminalOutput}>
            {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>

      {/* Beispiele (dezent, weiter unten) */}
      {commandConfig?.examples && commandConfig.examples.length > 0 && (
        <div className={appStyles.examplesSectionSmall}>
          <div className={appStyles.examplesTitleSmall}>Beispiele:</div>
          <ul className={appStyles.examplesList}>
            {commandConfig.examples.map((ex, idx) => (
              <li className={appStyles.exampleItemSmall} key={idx}>
                <code>{ex}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

