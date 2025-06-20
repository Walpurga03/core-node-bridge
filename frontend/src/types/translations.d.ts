export interface TranslationSchema {
  meta: {
    version: string;
    language: string;
    lastUpdated: string;
  };
  categories: {
    [key: string]: string;
  };
  buttons: {
    query: string;
    moreInfo: string;
    back: string;
    copy: string;
    loading: string;
  };
  info: {
    commandsCount: string;
    noResults: string;
    error: string;
  };
  validation: {
    required: string;
    invalidHash: string;
    invalidNumber: string;
    minValue: string;
  };
  commands: {
    [commandKey: string]: CommandTranslation;
  };
  mainView: {
    title: string;
    implementedCommands: string;
  };
  filters: {
    all: string;
    noParams: string;
    oneParam: string;
  };
}

export interface CommandTranslation {
  meta: CommandMeta;
  title: string;
  short: string;
  examples: string[];
  details: string;
}

export interface CommandMeta {
  category: string;
  params: CommandParam[];
  rpcVersion: string;
  complexity: string;
}

export interface CommandParam {
  name: string;
  type: string;
  required?: boolean;
  default?: string | number | boolean;
  desc: string;
  placeholder?: string;
  hint?: string;
  validation?: ParamValidation;
  options?: ParamOption[];
}

export interface ParamValidation {
  pattern?: string;
  errorMessage?: string;
  min?: number;
  max?: number;
}

export interface ParamOption {
  value: string | number;
  label: string;
  desc?: string;
  use_case?: string;
}