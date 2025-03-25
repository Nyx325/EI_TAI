/**
 * Enum para definir los modos de búsqueda de una cadena.
 *
 * @enum {number}
 */
export var SearchMode;
(function (SearchMode) {
    /** Búsqueda exacta (coincidencia total de la cadena). */
    SearchMode[SearchMode["EQUALS"] = 0] = "EQUALS";
    /** Búsqueda parcial (contiene la cadena de búsqueda). */
    SearchMode[SearchMode["LIKE"] = 1] = "LIKE";
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
