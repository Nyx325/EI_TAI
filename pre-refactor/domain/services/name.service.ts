import Service from "./service.js";

/**
 * Expresión regular para validar nombres que cumplen con los siguientes requisitos:
 * - Deben comenzar con una letra mayúscula o minúscula (incluyendo caracteres acentuados y la ñ).
 * - Cada palabra debe estar compuesta únicamente por letras.
 * - Se permiten espacios o guiones simples para separar palabras.
 * - No se permiten números ni caracteres especiales.
 * - No se permiten espacios consecutivos.
 *
 * Ejemplos válidos: "Juan Pérez", "María-José", "José Luis".
 *
 * @constant {RegExp}
 */
const regex =
  /^(?!.*\s\s)[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:[ -][A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/i;

/**
 * Servicio para validar nombres.
 *
 * - El nombre debe comenzar con una letra y puede contener caracteres acentuados y la ñ.
 * - No se permiten números ni caracteres especiales.
 * - Se puede usar un solo espacio o un guion para separar palabras.
 * - No se permiten espacios consecutivos ni nombres vacíos.
 *
 * @type {Service<string>}
 */
export const nameService: Service<string> = {
  isValid(value) {
    if (!value || value.trim() === "" || !regex.test(value.trim())) {
      return {
        valid: false,
        message: [
          "No se puede contener una cadena vacía o undefined",
          "El nombre debe comenzar con una letra (incluyendo caracteres acentuados y la ñ).",
          "Cada palabra debe estar compuesta únicamente por letras.",
          "No se permiten números ni caracteres especiales.",
          "Solo se puede usar un único espacio o guion para separar palabras.",
          "No se permiten espacios consecutivos.",
        ],
      };
    }

    return { valid: true };
  },
};

/**
 * Servicio para validar nombres opcionales.
 *
 * - Si el valor es `undefined` o `null`, se considera válido.
 * - Si se proporciona un valor, debe cumplir las mismas reglas que en {@link nameService}.
 *
 * @type {Service<string>}
 */
export const optionalNameService: Service<string> = {
  isValid(value) {
    if (!value) {
      return { valid: true };
    } else if (value.trim() === "" || !regex.test(value.trim())) {
      return {
        valid: false,
        message: [
          "No se puede contener una cadena vacía",
          "El nombre debe comenzar con una letra (incluyendo caracteres acentuados y la ñ).",
          "Cada palabra debe estar compuesta únicamente por letras.",
          "No se permiten números ni caracteres especiales.",
          "Solo se puede usar un único espacio o guion para separar palabras.",
          "No se permiten espacios consecutivos.",
        ],
      };
    }

    return { valid: true };
  },
};
