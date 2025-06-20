export interface TranslationSchema {
  buttons: {
    query: string;
    moreInfo: string;
    back: string;
    copy: string;
    loading: string;
    // ggf. weitere Buttons
  };
  commands: Record<string, any>;
}