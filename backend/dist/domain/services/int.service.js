/** Esta expresión se asegura de que la cadena solo contenga
 * dígitos y que el primer dígito sea distinto de 0, lo que
 * garantiza que el número es un entero positivo mayor que cero.
 */
const regex = /^[1-9]\d*$/;
const regex2 = /^[0-9]\d*$/;
export const intService = {
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
export const optionalIntService = {
    isValid(value) {
        if (!value) {
            return { valid: true };
        }
        else if (!regex.test(`${value}`)) {
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
export const intOrZeroService = {
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
export const optionalIntOrZeroService = {
    isValid(value) {
        if (!value) {
            return { valid: true };
        }
        else if (!regex2.test(`${value}`)) {
            return {
                valid: false,
                message: ["Se debe proporcionar un entero positivo o undefined"],
            };
        }
        return { valid: true };
    },
};
