export interface TranslationSchema {
  buttons: {
    query: string;
    moreInfo: string;
    back: string;
    copy: string;
    loading: string;
  };
  categories: {
    blockchain: string;
    control: string;
    mining: string;
    network: string;
    rawtransactions: string;
    signer: string;
    util: string;
    wallet: string;
    zmq: string;
  };
  info: {
    commandsCount: string;
    noResults: string;
    error: string;
  };
  complexity: {
    low: {
      title: string;
      description: string;
    };
    medium: {
      title: string;
      description: string;
    };
    high: {
      title: string;
      description: string;
    };
    
  };
  mainView: {
    title: string;
    implementedCommands: string;
  };
  commands: Record<string, any>;
}