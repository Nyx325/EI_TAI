import Service from "./service.js";

/**
 * Expresión regular que valida que la cadena solo contenga dígitos y que el primer dígito sea distinto de 0.
 * Esto garantiza que el número representado es un entero positivo mayor que cero.
 *
 * @constant {RegExp}
 */
const regex = /^[1-9]\d*$/;

/**
 * Expresión regular que valida que la cadena contenga únicamente dígitos.
 * Permite el valor "0" al inicio, por lo que se acepta 0 como entero.
 *
 * @constant {RegExp}
 */
const regex2 = /^[0-9]\d*$/;

/**
 * Servicio que valida que el valor proporcionado sea un entero positivo mayor que cero.
 *
 * Si el valor no existe o no cumple con el formato definido en {@link regex},
 * retorna un error indicando que se debe proporcionar un entero positivo diferente de cero.
 *
 * @type {Service<unknown>}
 */
export const intService: Service<unknown> = {
  isValid(value) {
    if (!value || !regex.test(`${value}`)) {
      return {
        valid: false,
        message: ["Se debe proporcionar un entero positivo diferente de cero"],
      };
    }

    return { valid: true };
  },
};

/**
 * Servicio que valida de manera opcional que el valor proporcionado sea un entero positivo mayor que cero.
 *
 * - Si el valor es undefined o null, se considera válido.
 * - Si se proporciona un valor pero no cumple con {@link regex}, se retorna un error.
 *
 * @type {Service<unknown>}
 */
export const optionalIntService: Service<unknown> = {
  isValid(value) {
    if (!value) {
      return { valid: true };
    } else if (!regex.test(`${value}`)) {
      return {
        valid: false,
        message: [
          "Se debe proporcionar un entero positivo diferente de cero o undefined",
        ],
      };
    }

    return { valid: true };
  },
};

/**
 * Servicio que valida que el valor proporcionado sea un entero positivo, permitiendo el valor cero.
 *
 * Se utiliza la expresión regular {@link regex2} para aceptar "0" o números positivos.
 * Si el valor es inexistente o no coincide con {@link regex2}, se retorna un error.
 *
 * @type {Service<unknown>}
 */
export const intOrZeroService: Service<unknown> = {
  isValid(value) {
    if (!value || !regex2.test(`${value}`)) {
      return {
        valid: false,
        message: ["Se debe proporcionar un entero positivo"],
      };
    }

    return { valid: true };
  },
};

/**
 * Servicio que valida de manera opcional que el valor proporcionado sea un entero positivo o cero.
 *
 * - Si el valor es undefined o null, se considera válido.
 * - Si se proporciona un valor pero no cumple con {@link regex2}, se retorna un error.
 *
 * @type {Service<unknown>}
 */
export const optionalIntOrZeroService: Service<unknown> = {
  isValid(value) {
    if (!value) {
      return { valid: true };
    } else if (!regex2.test(`${value}`)) {
      return {
        valid: false,
        message: ["Se debe proporcionar un entero positivo o undefined"],
      };
    }

    return { valid: true };
  },
};
