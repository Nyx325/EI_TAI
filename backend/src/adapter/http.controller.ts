import Search from "../domain/value_objects/search.js";
import Repository from "../application/repository.js";

/**
 * Clase abstracta que actúa como controlador HTTP para la persistencia de datos.
 * Su responsabilidad es validar que los datos que se envían al repositorio sean correctos
 * y, posteriormente, delegar en el repositorio la persistencia de dichos datos.
 *
 * Se utilizan varios tipos genéricos para adaptar la interfaz a distintos formatos:
 * - JM: Tipo de datos en formato JSON que representa el modelo de entrada.
 * - JC: Tipo de datos en formato JSON que representa el criterio de búsqueda.
 * - M: Tipo de modelo manejado por el repositorio.
 * - NM: Tipo de datos necesarios para crear un nuevo modelo en el repositorio.
 * - I: Tipo de identificador único para los modelos en el repositorio.
 * - C: Tipo de criterio utilizado en el repositorio para filtrar datos.
 *
 * @template JM - Tipo de datos JSON del modelo (entrada).
 * @template JC - Tipo de datos JSON del criterio (entrada).
 * @template M - Tipo de modelo persistido.
 * @template NM - Tipo de datos para crear un nuevo modelo.
 * @template I - Tipo de identificador único del modelo.
 * @template C - Tipo de criterio para búsquedas en el repositorio.
 */
export default abstract class HttpController<JM, JC, M, NM, I, C> {
  /**
   * Repositorio que se utilizará para la persistencia de los datos.
   */
  protected repo: Repository<M, NM, I, C>;

  /**
   * Crea una nueva instancia del controlador HTTP.
   *
   * @param repo Repositorio que implementa la interfaz {@link Repository} para la persistencia.
   */
  public constructor(repo: Repository<M, NM, I, C>) {
    this.repo = repo;
  }

  /**
   * Agrega un nuevo objeto.
   *
   * Este método debe implementar la lógica para validar y transformar los datos JSON de entrada
   * (de tipo JM) y, mediante el repositorio, persistir el nuevo objeto.
   *
   * @param newData Datos en formato JSON (tipo JM) para crear el nuevo objeto.
   * @returns Una promesa que se resuelve con el objeto persistido de tipo M.
   */
  public abstract add(newData: JM): Promise<M>;

  /**
   * Actualiza un objeto existente.
   *
   * Este método debe implementar la lógica para validar y transformar los datos JSON de entrada
   * (de tipo JM) y actualizar el objeto existente a través del repositorio.
   *
   * @param data Datos en formato JSON (tipo JM) que contienen la información actualizada.
   * @returns Una promesa que se resuelve con el objeto actualizado de tipo M.
   */
  public abstract update(data: JM): Promise<M>;

  /**
   * Elimina un objeto a partir de su identificador.
   *
   * Este método debe validar el identificador recibido y, mediante el repositorio, eliminar
   * el objeto correspondiente.
   *
   * @param id Identificador del objeto a eliminar.
   * @returns Una promesa que se resuelve con el objeto eliminado de tipo M.
   */
  public abstract delete(id: unknown): Promise<M>;

  /**
   * Obtiene un objeto por su identificador.
   *
   * Este método debe implementar la lógica para recuperar el objeto correspondiente
   * desde el repositorio, retornando null o undefined si no se encuentra.
   *
   * @param id Identificador del objeto a obtener.
   * @returns Una promesa que se resuelve con el objeto de tipo M o null/undefined si no se encuentra.
   */
  public abstract get(id: unknown): Promise<M | null | undefined>;

  /**
   * Realiza una búsqueda de objetos utilizando un criterio de filtrado.
   *
   * Este método debe implementar la lógica para transformar el filtro JSON de entrada (tipo JC)
   * en un criterio adecuado para el repositorio, y retornar una instancia de Search que contenga
   * los resultados de la búsqueda.
   *
   * @param filter Objeto en formato JSON (tipo JC) que define el criterio de búsqueda.
   * @returns Una promesa que se resuelve con una instancia de Search que contiene los objetos
   * encontrados y los criterios de búsqueda utilizados (tipo {@link Search}<M, C>).
   */
  public abstract getBy(filter: JC): Promise<Search<M, C>>;
}
