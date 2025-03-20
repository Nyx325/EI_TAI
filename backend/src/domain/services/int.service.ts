import Service from "./service.js";

/** Esta expresión se asegura de que la cadena solo contenga
 * dígitos y que el primer dígito sea distinto de 0, lo que
 * garantiza que el número es un entero positivo mayor que cero.
 */
const regex = /^[1-9]\d*$/;

export const intService: Service<unknown> = {
  isValid(value) {
    if (!value || !regex.test(`${value}`)) {
      return {
        valid: false,
        message: ["Se debe proporcionar un entero positivo"],
      };
    }

    return { valid: true };
  },
};

export const optionalIntService: Service<unknown> = {
  isValid(value) {
    if (!value) {
      return { valid: true };
    } else if (!regex.test(`${value}`)) {
      return {
        valid: false,
        message: ["Se debe proporcionar un entero positivo o undefined"],
      };
    }

    return { valid: true };
  },
};
