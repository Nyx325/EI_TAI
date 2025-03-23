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
