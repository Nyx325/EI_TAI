/**
 * Representa el resultado de una validación.
 *
 * @typedef {Object} ServiceValidation
 * @property {boolean} valid - Indica si la validación fue exitosa o no.
 * @property {string[]} [message] - Lista de mensajes de error en caso de que la validación falle.
 */
export type ServiceValidation = {
  valid: boolean;
  message?: string[];
};

/**
 * Interfaz para un servicio de validación genérico.
 *
 * @template T - Tipo de dato que será validado.
 */
export default interface Service<T> {
  /**
   * Valida un valor dado y devuelve el resultado de la validación.
   *
   * @param {T} [value] - El valor a validar.
   * @returns {ServiceValidation} - Resultado de la validación, indicando si es válido o no.
   */
  isValid(value?: T): ServiceValidation;
}
