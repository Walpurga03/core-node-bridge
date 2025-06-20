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