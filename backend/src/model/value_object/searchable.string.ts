export enum SearchMode {
  EQUALS = "equals",
  LIKE = "like",
}

export class SearchableString {
  str: string;
  mode: SearchMode;

  constructor(str: string, mode: SearchMode = SearchMode.EQUALS) {
    this.str = str;
    this.mode = mode;
  }
}
