import Service from "./service.js";

/**
 * Expresión regular que valida si un valor es exactamente "true" o "false".
 * @constant {RegExp}
 */
const regex = /^(true|false)$/;

/**
 * Servicio que valida que el valor recibido sea un booleano expresado como cadena ("true" o "false").
 *
 * - Si el valor es undefined, null o una cadena vacía, se considera inválido.
 * - Si el valor no coincide con la expresión regular, se considera inválido.
 *
 * @type {Service<unknown>}
 */
export const booleanService: Service<unknown> = {
  isValid(value) {
    if (value === undefined || value === null || `${value}`.trim() === "") {
      return {
        valid: false,
        message: ["El valor es obligatorio ('true' o 'false')"],
      };
    } else if (!regex.test(`${value}`.trim())) {
      return {
        valid: false,
        message: ["El valor sólo puede ser 'true' o 'false'"],
      };
    }

    return { valid: true };
  },
};

/**
 * Servicio que valida que el valor recibido sea un booleano expresado como cadena ("true" o "false")
 * de forma opcional.
 *
 * - Si el valor es undefined o null, se considera válido.
 * - Si el valor es una cadena vacía, se considera inválido.
 * - Si el valor no coincide con la expresión regular, se considera inválido.
 *
 * @type {Service<unknown>}
 */
export const optionalBooleanService: Service<unknown> = {
  isValid(value) {
    if (value === null || value === undefined) {
      return { valid: true };
    } else if (`${value}`.trim() === "") {
      return {
        valid: false,
        message: ["El valor es obligatorio ('true' o 'false')"],
      };
    } else if (!regex.test(`${value}`.trim())) {
      return {
        valid: false,
        message: ["El valor sólo puede ser 'true' o 'false'"],
      };
    }

    return { valid: true };
  },
};

/**
 * Convierte un valor a un booleano.
 *
 * El valor se convierte a cadena, se recorta y se pasa a minúsculas para comparar con "true".
 *
 * @param {unknown} value - Valor a convertir.
 * @returns {boolean} - Retorna `true` si el valor es "true" (sin importar mayúsculas/minúsculas), de lo contrario `false`.
 */
export const instanceBool = (value: unknown) =>
  `${value}`.trim().toLowerCase() === "true";

/**
 * Convierte un valor opcional a un booleano.
 *
 * Si el valor es undefined o null, retorna undefined; de lo contrario,
 * convierte el valor a cadena, lo recorta y lo pasa a minúsculas para comparar con "true".
 *
 * @param {unknown} [value] - Valor opcional a convertir.
 * @returns {boolean | undefined} - Retorna `true` si el valor es "true", `false` si es distinto y `undefined` si no se proporcionó.
 */
export const instanceOptionalBool = (value?: unknown) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  return `${value}`.trim().toLowerCase() === "true";
};
