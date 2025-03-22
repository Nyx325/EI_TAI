const regex = /^(true|false)$/;
export const booleanService = {
    isValid(value) {
        if (value === undefined || value === null || `${value}`.trim() === "") {
            return {
                valid: false,
                message: ["El valor es obligatorio"],
            };
        }
        else if (!regex.test(`${value}`.trim())) {
            return {
                valid: false,
                message: ["El valor sólo puede ser 'true' o 'false'"],
            };
        }
        return { valid: true };
    },
};
export const instanceBool = (value) => `${value}`.trim().toLowerCase() === "true";
