/**
 * Enum para definir los modos de búsqueda de una cadena.
 *
 * @enum {number}
 */
export enum SearchMode {
  /** Búsqueda exacta (coincidencia total de la cadena). */
  EQUALS,

  /** Búsqueda parcial (contiene la cadena de búsqueda). */
  LIKE,
}

/**
 * Representa una cadena de búsqueda con un modo específico.
 *
 * @interface SearchableString
 */
export interface SearchableString {
  /** La cadena de texto que se utilizará para la búsqueda. */
  str: string;

  /** Define si la búsqueda debe ser exacta o parcial. */
  mode: SearchMode;
}
