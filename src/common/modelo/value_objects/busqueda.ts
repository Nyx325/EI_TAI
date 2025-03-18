/**
 * Representa los resultados de una búsqueda,
 * incluyendo información de paginación,
 * criterios de búsqueda y los elementos
 * obtenidos.
 *
 * @template M - Tipo del modelo que se está
 * buscando.
 */
export default interface Busqueda<M, C> {
  /**
   * Cantidad total de páginas disponibles en
   * los resultados de la búsqueda.
   */
  paginasTotales: number;

  /**
   * Número de la página actual en los
   * resultados.
   */
  paginaActual: number;

  /**
   * Criterios de búsqueda utilizados para
   * filtrar los resultados.
   *
   * Este campo es un objeto que almacena los
   * parámetros usados para la búsqueda, permitiendo
   * identificar los filtros aplicados.
   */
  criterio: C;

  /**
   * Lista de resultados obtenidos de la búsqueda.
   *
   * Este campo contiene un arreglo de elementos
   * del tipo `M`. Si no hay resultados,
   * el arreglo estará vacío.
   */
  resultados: M[];
}
