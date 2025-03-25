/**
 * Representa los resultados de una búsqueda,
 * incluyendo información de paginación,
 * criterios de búsqueda y los elementos
 * obtenidos.
 *
 * @template M - Tipo del modelo que se está
 * buscando.
 */
export default interface Search<M, C> {
  /**
   * Cantidad total de páginas disponibles en
   * los resultados de la búsqueda.
   */
  totalPages: number;

  /**
   * Número de la página actual en los
   * resultados.
   */
  currentPage: number;

  /**
   * Criterios de búsqueda utilizados para
   * filtrar los resultados.
   *
   * Este campo es un objeto que almacena los
   * parámetros usados para la búsqueda, permitiendo
   * identificar los filtros aplicados.
   */
  criteria: C;

  /**
   * Lista de resultados obtenidos de la búsqueda.
   *
   * Este campo contiene un arreglo de elementos
   * del tipo `M`. Si no hay resultados,
   * el arreglo estará vacío.
   */
  result: M[];
}
