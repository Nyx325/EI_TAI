import JsonResponse from "../domain/exceptions/json.response.js";
import { intService } from "../domain/services/int.service.js";
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
export default class HttpController {
    /**
     * Repositorio que se utilizará para la persistencia de los datos.
     */
    repo;
    /**
     * Crea una nueva instancia del controlador HTTP.
     *
     * @param repo Repositorio que implementa la interfaz {@link Repository} para la persistencia.
     */
    constructor(repo) {
        this.repo = repo;
    }
    /**
     * Valida el parámetro de paginación.
     *
     * Se utiliza un servicio de validación (intService) para comprobar que el valor de `page`
     * sea un número entero válido. Si la validación falla, se lanza una excepción con una
     * respuesta JSON que contiene los mensajes de error.
     *
     * @param page Valor a validar como número entero.
     * @throws {JsonResponse} Si el valor de `page` no es válido.
     */
    validatePage(page) {
        const { valid, message } = intService.isValid(page);
        if (!valid) {
            throw new JsonResponse([message]);
        }
    }
}
