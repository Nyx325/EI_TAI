export var SearchMode;
(function (SearchMode) {
    SearchMode["EQUALS"] = "equals";
    SearchMode["LIKE"] = "like";
})(SearchMode || (SearchMode = {}));
export class SearchableString {
    str;
    mode;
    constructor(str, mode = SearchMode.EQUALS) {
        this.str = str;
        this.mode = mode;
    }
}
