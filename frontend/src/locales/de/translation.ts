import type { TranslationSchema } from '../../schema';
import { blockchainCommands } from './commands/blockchain';
import { controlCommands } from './commands/control';
import { miningCommands } from './commands/mining';
import { networkCommands } from './commands/network';
import { rawtransactions } from './commands/rawtransactions';
import { signerCommands } from './commands/signer';
import { util } from './commands/util';
import { walletCommands } from './commands/wallet';
import { zmqCommands } from './commands/zmq';

export const deTranslations: TranslationSchema = {
  buttons: {
    "query": "Abfragen",
    "moreInfo": "Mehr Infos",
    "back": "Zurück",
    "copy": "Kopieren",
    "loading": "Lädt..."
  },
  categories: {
    "blockchain": "Blockchain",
    "control": "Kontrolle",
    "mining": "Mining",
    "network": "Netzwerk",
    "rawtransactions": "Rohtransaktionen",
    "signer": "Signer",
    "util": "Dienstprogramme",
    "wallet": "Wallet",
    "zmq": "ZMQ"
  },
  info: {
    "commandsCount": "{{count}} Befehle gefunden",
    "noResults": "Keine Ergebnisse gefunden",
    "error": "Fehler beim Abrufen der Daten"
  },
  complexity: {
    "low": {
      "title": "Einfache Abfragen",
      "description": "Perfekt für schnelle Abfragen und erste Einblicke. Diese Befehle sind meist ohne Parameter nutzbar und liefern grundlegende Statusinformationen."
    },
    "medium": {
      "title": "Mittlere Komplexität",
      "description": "Für gezielte Aktionen und detailliertere Informationen. Hier kommen Parameter ins Spiel, um spezifische Aufgaben zu steuern."
    },
    "high": {
      "title": "Expertenbefehle",
      "description": "Mächtige Werkzeuge für Experten. Mit Vorsicht zu verwenden, da sie tiefgreifende Änderungen bewirken oder komplexes Wissen erfordern können."
    }
  },
   mainView: {
    "title": "Kategorien",
    "implementedCommands": "Implementiert: {{count}}"
  },
  commands: {
    ...blockchainCommands,
    ...controlCommands,
    ...miningCommands,
    ...networkCommands,
    ...rawtransactions,
    ...signerCommands,
    ...util,
    ...walletCommands,
    ...zmqCommands,
  }
};