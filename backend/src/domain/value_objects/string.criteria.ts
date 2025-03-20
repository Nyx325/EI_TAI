export enum SearchMode {
  EQUALS,
  LIKE,
}

export interface SearchableString {
  str: string;
  mode: SearchMode;
}
