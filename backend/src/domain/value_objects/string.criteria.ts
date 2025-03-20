export enum SearchMode {
  EQUALS,
  LIKE,
}

export interface SearchableString {
  str: string;
  mode: SearchMode;
}

export interface SearchableStringJson {
  contains?: unknown;
  equals?: unknown;
}
