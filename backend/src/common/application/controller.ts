import Search from "../domain/value_objects/search.js";
import Repository from "./repository.js";

/**
 * Interfaz que define las operaciones básicas para la gestión de objetos
 * realizando validaciones de acuerdo a la lógica de negocio.
 *
 * @template M Tipo que representa el objeto completo.
 * @template NM Tipo que representa el nuevo objeto a crear.
 * @template I Tipo del identificador único del objeto.
 * @template C Tipo que define el criterio de búsqueda.
 */
export default abstract class Controller<M, NM, I, C> {
  protected repo: Repository<M, NM, I, C>;

  public constructor(repo: Repository<M, NM, I, C>) {
    this.repo = repo;
  }

  /**
   * Agrega un nuevo objeto.
   *
   * @param newData Datos del nuevo objeto de tipo NM.
   * @throws Error si ocurre algún error durante la ejecución.
   * @throws JsonErrorResponse si la entrada del usuario es inválida.
   * @returns Una promesa que se resuelve con el objeto completo de tipo M.
   */
  public abstract add(newData: NM): Promise<M>;

  /**
   * Actualiza un objeto existente.
   *
   * @param data Objeto de tipo M que contiene la información a actualizar.
   * @throws Error si ocurre algún error durante la ejecución.
   * @throws JsonErrorResponse si la entrada del usuario es inválida.
   * @returns Una promesa que se resuelve con el objeto actualizado de tipo M.
   */
  public abstract update(data: M): Promise<M>;

  /**
   * Elimina un objeto según su identificador.
   *
   * @param id Identificador único del objeto a eliminar.
   * @throws Error si ocurre algún error durante la ejecución.
   * @throws JsonErrorResponse si la entrada del usuario es inválida.
   * @returns Una promesa que se resuelve con el objeto eliminado de tipo M.
   */
  public abstract delete(id: I): Promise<M>;

  /**
   * Obtiene un objeto por su identificador.
   *
   * @param id Identificador único del objeto a obtener.
   * @throws Error si ocurre algún error durante la ejecución.
   * @throws JsonErrorResponse si la entrada del usuario es inválida.
   * @returns Una promesa que se resuelve con el objeto de tipo M, o null/undefined si no se encuentra.
   */
  public abstract get(id: I): Promise<M | null | undefined>;

  /**
   * Realiza una búsqueda paginada de objetos que cumplen con el criterio especificado.
   *
   * @param criteria Objeto que define el criterio de búsqueda de tipo C.
   * @param page Número de página para la paginación.
   * @throws Error si ocurre algún error durante la ejecución.
   * @throws JsonErrorResponse si la entrada del usuario es inválida.
   * @returns Una promesa que se resuelve con una instancia de Search que contiene los objetos encontrados y los criterios utilizados.
   */
  public abstract getBy(criteria: C, page: number): Promise<Search<M, C>>;
}
