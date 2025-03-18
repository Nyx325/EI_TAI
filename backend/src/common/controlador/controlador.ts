import Busqueda from "../modelo/value_objects/busqueda.js";

/**
 * Interfaz que define las operaciones básicas para la gestión de objetos.
 *
 * @template M Tipo que representa el objeto completo.
 * @template NM Tipo que representa el nuevo objeto a crear.
 * @template I Tipo del identificador único del objeto.
 * @template C Tipo que define el criterio de búsqueda.
 */
export default interface Controlador<M, NM, I, C> {
  /**
   * Agrega un nuevo objeto.
   *
   * @param datoNuevo Datos del nuevo objeto de tipo NM.
   * @returns Una promesa que se resuelve con el objeto completo de tipo M.
   */
  agregar(datoNuevo: NM): Promise<M>;

  /**
   * Actualiza un objeto existente.
   *
   * @param dato Objeto de tipo M que contiene la información a actualizar.
   * @returns Una promesa que se resuelve con el objeto actualizado de tipo M.
   */
  actualizar(dato: M): Promise<M>;

  /**
   * Elimina un objeto según su identificador.
   *
   * @param id Identificador único del objeto a eliminar.
   * @returns Una promesa que se resuelve con el objeto eliminado de tipo M.
   */
  eliminar(id: I): Promise<M>;

  /**
   * Obtiene un objeto por su identificador.
   *
   * @param id Identificador único del objeto a obtener.
   * @returns Una promesa que se resuelve con el objeto de tipo M, o null/undefined si no se encuentra.
   */
  obtener(id: I): Promise<M | null | undefined>;

  /**
   * Realiza una búsqueda paginada de objetos que cumplen con el criterio especificado.
   *
   * @param criterio Objeto que define el criterio de búsqueda de tipo C.
   * @param pagina Número de página para la paginación.
   * @returns Una promesa que se resuelve con una instancia de Busqueda que contiene los objetos encontrados y los criterios utilizados.
   */
  buscar(criterio: C, pagina: number): Promise<Busqueda<M, C>>;
}
