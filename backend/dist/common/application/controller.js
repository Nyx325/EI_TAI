/**
 * Interfaz que define las operaciones básicas para la gestión de objetos
 * realizando validaciones de acuerdo a la lógica de negocio.
 *
 * @template M Tipo que representa el objeto completo.
 * @template NM Tipo que representa el nuevo objeto a crear.
 * @template I Tipo del identificador único del objeto.
 * @template C Tipo que define el criterio de búsqueda.
 */
export default class Controller {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
}
