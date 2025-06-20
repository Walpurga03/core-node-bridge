import type { TranslationSchema } from '../../types/translations'; // Pfad anpassen

export const enTranslations: TranslationSchema = {
  "meta": {
    "version": "1.0.0",
    "language": "en",
    "lastUpdated": "2025-06-15"
  },
  "categories": {
    "blockchain": "Blockchain",
    "control": "Control",
    "mining": "Mining",
    "network": "Network",
    "rawtransactions": "Raw Transactions",
    "signer": "Signer",
    "util": "Utilities",
    "wallet": "Wallet",
    "zmq": "ZMQ"
  },
  "buttons": {
    "query": "Query",
    "moreInfo": "More Info",
    "back": "Back",
    "copy": "Copy",
    "loading": "Loading..."
  },
  "info": {
    "commandsCount": "{{count}} commands integrated",
    "noResults": "No commands found for this filter.",
    "error": "An error occurred"
  },
  "validation": {
    "required": "This field is required",
    "invalidHash": "Invalid hash value (64 hexadecimal characters expected)",
    "invalidNumber": "Invalid number entered",
    "minValue": "Value must be at least {{min}}"
  },
  "mainView": {
    "title": "Categories",
    "implementedCommands": "Implemented: {{count}}"
  },
  "filters": {
    "all": "All",
    "noParams": "0 Parameters",
    "oneParam": "1 Parameter"
  },
   "commands": {
    // Blockchain Commands
    "getblockchaininfo": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.9.0",
        "complexity": "low"
      },
      "title": "Get Blockchain Info",
      "short": "Shows general information about the current blockchain, e.g. block height, chain, pruning status and more.",
      "details": "getblockchaininfo (0.9.0 RPC)\n\nReturns an object containing various state info regarding blockchain processing.\n\nResult:\n{                                         (json object)\n  \"chain\" : \"str\",                        (string) current network name (main, test, testnet4, signet, regtest)\n  \"blocks\" : n,                           (numeric) the height of the most-work fully-validated chain. The genesis block has height 0\n  \"headers\" : n,                          (numeric) the current number of headers we have validated\n  \"bestblockhash\" : \"str\",                (string) the hash of the currently best block\n  \"bits\" : \"hex\",                         (string) nBits: compact representation of the block difficulty target\n  \"target\" : \"hex\",                       (string) The difficulty target\n  \"difficulty\" : n,                       (numeric) the current difficulty\n  \"time\" : xxx,                           (numeric) The block time expressed in UNIX epoch time\n  \"mediantime\" : xxx,                     (numeric) The median block time expressed in UNIX epoch time\n  \"verificationprogress\" : n,             (numeric) estimate of verification progress [0..1]\n  \"initialblockdownload\" : true|false,    (boolean) (debug information) estimate of whether this node is in Initial Block Download mode\n  \"chainwork\" : \"hex\",                    (string) total amount of work in active chain, in hexadecimal\n  \"size_on_disk\" : n,                     (numeric) the estimated size of the block and undo files on disk\n  \"pruned\" : true|false,                  (boolean) if the blocks are subject to pruning\n  \"pruneheight\" : n,                      (numeric, optional) height of the last block pruned, plus one (only present if pruning is enabled)\n  \"automatic_pruning\" : true|false,       (boolean, optional) whether automatic pruning is enabled (only present if pruning is enabled)\n  \"prune_target_size\" : n,                (numeric, optional) the target size used by pruning (only present if automatic pruning is enabled)\n  \"signet_challenge\" : \"hex\",             (string, optional) the block challenge (aka. block script), in hexadecimal (only present if the current network is a signet)\n  \"warnings\" : [                          (json array) any network and blockchain warnings (run with `-deprecatedrpc=warnings` to return the latest warning as a single string)\n    \"str\",                                (string) warning\n    ...\n  ]\n}\n\nExamples:\n> bitcoin-cli getblockchaininfo \n> curl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockchaininfo\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/"
    },
    "getblockcount": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.1.0",
        "complexity": "low"
      },
      "title": "getblockcount",
      "short": "Returns the height of the most-work fully-validated chain. The genesis block has height 0.",
      "details": "getblockcount (0.1.0 RPC)\n\nReturns the height of the most-work fully-validated chain. The genesis block has height 0.\n\nResult:\nn    (numeric) The current block count\n\nExamples:\n> bitcoin-cli getblockcount\n> curl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockcount\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/"
    },
    "getbestblockhash": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.1.0",
        "complexity": "low"
      },
      "title": "getbestblockhash",
      "short": "Returns the hash of the best (tip) block in the most-work fully-validated chain.",
      "details": "getbestblockhash (0.1.0 RPC)\n\nReturns the hash of the best (tip) block in the most-work fully-validated chain.\n\nResult:\n\"hex\"    (string) the block hash, hex-encoded\n\nExamples:\n> bitcoin-cli getbestblockhash\n> curl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getbestblockhash\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/"
    },
    "getblock": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhash",
            "type": "string",
            "required": true,
            "desc": "The block hash",
            "placeholder": "e.g., 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
            "hint": "Enter a valid block hash (64 hexadecimal characters)",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash must be exactly 64 hexadecimal characters"
            }
          },
          {
            "name": "verbosity",
            "type": "number",
            "required": false,
            "default": 1,
            "desc": "Verbosity level (0-3)",
            "hint": "Determines the format of the return value",
            "options": [
              {
                "value": 0,
                "label": "0 - Hex Data",
                "desc": "Raw block data (hexadecimal)",
                "use_case": "For further processing of raw data"
              },
              {
                "value": 1,
                "label": "1 - Block Info",
                "desc": "JSON with block information",
                "use_case": "Standard view with basic information"
              },
              {
                "value": 2,
                "label": "2 - + Transactions",
                "desc": "JSON with block and transaction data",
                "use_case": "Detailed analysis of all transactions"
              },
              {
                "value": 3,
                "label": "3 - + Prevout Info",
                "desc": "JSON with full transaction details",
                "use_case": "Complete transaction analysis with inputs"
              }
            ],
            "validation": {
              "min": 0,
              "max": 3,
              "errorMessage": "Verbosity must be between 0 and 3"
            }
          }
        ],
        "rpcVersion": "0.6.0",
        "complexity": "medium"
      },
      "title": "getblock",
      "short": "Shows information about a block by its hash. Optionally, the detail level (verbosity) can be chosen.",
      "details": "getblock (0.6.0 RPC)\n\nReturns information about a block by requested blockhash. The verbosity level controls the detail.\n\nArguments:\n1. blockhash    (string, required) The block hash\n2. verbosity    (numeric, optional, default=1) 0 for hex-encoded data, 1 for a JSON object, 2 for JSON object with transaction data, and 3 for JSON object with transaction data including prevout information for inputs\n\nResult (for verbosity = 0):\n\"hex\"    (string) A string that is serialized, hex-encoded data for block 'hash'\n\nResult (for verbosity = 1):\n{ ... }   (Object with block information)\n\nResult (for verbosity = 2):\n{ ... }   (Object with block and transaction information)\n\nResult (for verbosity = 3):\n{ ... }   (Object with block, transaction, and prevout information)\n\nExamples:\n> bitcoin-cli getblock \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\"\n> curl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblock\", \"params\": [\"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/"
    },
    "getblockhash": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "height",
            "type": "number",
            "required": true,
            "desc": "Block height",
            "placeholder": "e.g., 100000",
            "hint": "Enter a valid block height (0 or higher)",
            "validation": {
              "min": 0,
              "max": 999999999,
              "errorMessage": "Block height must be 0 or higher"
            }
          }
        ],
        "rpcVersion": "0.6.0",
        "complexity": "low"
      },
      "title": "getblockhash",
      "short": "Returns the hash of the block at the given height in the best-validated chain.",
      "details": "getblockhash (0.6.0 RPC)\n\nReturns hash of block in best-block-chain at height provided.\n\nArguments:\n1. height    (numeric, required) The height index\n\nResult:\n\"hex\"    (string) The block hash\n\nExamples:\n> bitcoin-cli getblockhash 100000\n> curl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockhash\", \"params\": [100000]}' -H 'content-type: application/json' http://127.0.0.1:8332/"
    },
    "getblockfilter": {
      "meta": {
        "category": "blockchain",
        "params": [
          {
            "name": "blockhash",
            "type": "string",
            "required": true,
            "desc": "The block hash",
            "placeholder": "e.g., 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
            "hint": "Enter a valid block hash (64 hexadecimal characters)",
            "validation": {
              "pattern": "^[a-fA-F0-9]{64}$",
              "errorMessage": "Hash must be exactly 64 hexadecimal characters"
            }
          },
          {
            "name": "filtertype",
            "type": "string",
            "required": false,
            "default": "basic",
            "desc": "Filter type (optional)",
            "placeholder": "e.g., basic",
            "hint": "The type name of the filter (e.g., 'basic')",
            "options": [
              { "value": "basic", "label": "basic", "desc": "Standard BIP157 block filter" }
            ]
          }
        ],
        "rpcVersion": "0.19.0",
        "complexity": "medium"
      },
      "title": "getblockfilter",
      "short": "Retrieve a BIP 157 content filter for a particular block.",
      "details": "### getblockfilter (0.19.0 RPC)\n\nRetrieve a BIP 157 content filter for a particular block.\n\nArguments:\n1. `blockhash` (string, required) The hash of the block\n2. `filtertype` (string, optional, default=\"basic\") The type name of the filter\n\nResult:\n```json\n{\n  \"filter\" : \"hex\",    (string) the hex-encoded filter data\n  \"header\" : \"hex\"     (string) the hex-encoded filter header\n}\n```\n\nExamples:\n```\n> bitcoin-cli getblockfilter \"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\" \"basic\"\n> curl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getblockfilter\", \"params\": [\"00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09\", \"basic\"]}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getchainstates": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "29.0.0",
        "complexity": "medium"
      },
      "title": "Get Chainstates",
      "short": "Returns information about the various chainstates (alternative blockchain states) that the node is tracking.",
      "details": "### getchainstates (since Bitcoin Core 29.0.0)\n\nReturn information about chainstates.\n\n**Result:**\n```json\n{\n  \"headers\" : n,                       // (numeric) the number of headers seen so far\n  \"chainstates\" : [                    // (json array) list of the chainstates ordered by work, with the most-work (active) chainstate last\n    {\n      \"blocks\" : n,                    // (numeric) number of blocks in this chainstate\n      \"bestblockhash\" : \"hex\",         // (string) blockhash of the tip\n      \"bits\" : \"hex\",                  // (string) nBits: compact representation of the block difficulty target\n      \"target\" : \"hex\",                // (string) The difficulty target\n      \"difficulty\" : n,                // (numeric) difficulty of the tip\n      \"verificationprogress\" : n,      // (numeric) progress towards the network tip\n      \"snapshot_blockhash\" : \"hex\",    // (string, optional) the base block of the snapshot this chainstate is based on, if any\n      \"coins_db_cache_bytes\" : n,      // (numeric) size of the coinsdb cache\n      \"coins_tip_cache_bytes\" : n,     // (numeric) size of the coinstip cache\n      \"validated\" : true|false         // (boolean) whether the chainstate is fully validated. True if all blocks in the chainstate were validated, false if the chain is based on a snapshot and the snapshot has not yet been validated.\n    },\n    ...\n  ]\n}\n```\n\n**Examples:**\n```bash\nbitcoin-cli getchainstates \n```\n```bash\ncurl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getchainstates\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/\n```"
    },
    "getchaintips": {
      "meta": {
        "category": "blockchain",
        "params": [],
        "rpcVersion": "0.10.0", // Assuming a version, adjust if known
        "complexity": "medium"
      },
      "title": "Get Chain Tips",
      "short": "Return information about all known tips in the block tree, including the main chain as well as orphaned branches.",
      "details": "getchaintips\n\nReturn information about all known tips in the block tree, including the main chain as well as orphaned branches.\n\nResult:\n[\n  {\n    \"height\" : n,        // (numeric) height of the chain tip\n    \"hash\" : \"hex\",      // (string) block hash of the tip\n    \"branchlen\" : n,     // (numeric) zero for main chain, otherwise length of branch connecting the tip to the main chain\n    \"status\" : \"str\"     // (string) status of the chain, \"active\" for the main chain\n                         // Possible values for status:\n                         // 1.  \"invalid\"               This branch contains at least one invalid block\n                         // 2.  \"headers-only\"          Not all blocks for this branch are available, but the headers are valid\n                         // 3.  \"valid-headers\"         All blocks are available for this branch, but they were never fully validated\n                         // 4.  \"valid-fork\"            This branch is not part of the active chain, but is fully validated\n                         // 5.  \"active\"                This is the tip of the active main chain, which is certainly valid\n  },\n  ...\n]\n\nExamples:\n> bitcoin-cli getchaintips \n> curl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getchaintips\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/"
    },
   
      // ZMQ Commands
    "getzmqnotifications": {
      "meta": {
        "category": "zmq",
        "params": [],
        "rpcVersion": "0.15.0",
        "complexity": "low"
      },
      "title": "getzmqnotifications",
      "short": "Returns information about the active ZeroMQ notifications.",
      "details": "getzmqnotifications\n\nReturns information about the active ZeroMQ notifications.\n\nResult:\n[                         (json array)\n  {                       (json object)\n    \"type\" : \"str\",       (string) Type of notification\n    \"address\" : \"str\",    (string) Address of the publisher\n    \"hwm\" : n             (numeric) Outbound message high water mark\n  },\n  ...\n]\n\nExamples:\n> bitcoin-cli getzmqnotifications\n> curl --user myusername --data-binary '{\"jsonrpc\": \"2.0\", \"id\": \"curltest\", \"method\": \"getzmqnotifications\", \"params\": []}' -H 'content-type: application/json' http://127.0.0.1:8332/"
    },
  }
};