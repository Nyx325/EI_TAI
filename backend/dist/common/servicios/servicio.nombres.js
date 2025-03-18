const regex = /^(?!.*\s\s)[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:[ -][A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/i;
export const nombreObligatorioServicio = {
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
export const nombreOpcionalServicio = {
    isValid(value) {
        if (!value) {
            return { valid: true };
        }
        else if (value.trim() === "" || !regex.test(value.trim())) {
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
