/**
 * Enum para definir los modos de búsqueda de una cadena.
 *
 * @enum {number}
 */
export var SearchMode;
(function (SearchMode) {
    /** Búsqueda exacta (coincidencia total de la cadena). */
    SearchMode["EQUALS"] = "equals";
    /** Búsqueda parcial (contiene la cadena de búsqueda). */
    SearchMode["LIKE"] = "like";
})(SearchMode || (SearchMode = {}));
/**
 * Representa una cadena de búsqueda con un modo específico.
 *
 * @interface SearchableString
 */
export class SearchableString {
    /** La cadena de texto que se utilizará para la búsqueda. */
    str;
    /** Define si la búsqueda debe ser exacta o parcial. */
    mode;
    constructor(str, mode = SearchMode.EQUALS) {
        this.str = str;
        this.mode = mode;
    }
}
