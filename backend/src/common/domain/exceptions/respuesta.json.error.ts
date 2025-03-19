/**
 * Clase que representa un error generado por una entrada de datos inválida
 * proporcionada por el usuario al interactuar con la API. Permite almacenar
 * mensajes de error en un formato legible y estructurado para ser enviados como
 * respuesta en formato JSON.
 *
 * @extends Error
 */
export default class JsonErroResponse extends Error {
  /**
   * Array de objetos que contienen los detalles del error en un formato legible.
   * Cada objeto en el array debe estructurarse de forma que facilite la comprensión
   * y el manejo del error por parte del cliente.
   */
  errors: Object[];

  /**
   * Crea una instancia de JsonErrorResponse.
   */
  constructor(errors: Object[]) {
    super("bad request");
    this.errors = errors;
  }
}
