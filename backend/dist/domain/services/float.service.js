export class FloatService {
    optional;
    regex;
    constructor(maxIntegers, optional = false) {
        this.regex = new RegExp(`^\\d{1,${maxIntegers}}(?:\\.\\d+)?$`);
        this.optional = optional;
    }
    isValid(value) {
        if (this.optional && (value === undefined || `${value}`.trim() === "")) {
            return { valid: true };
        }
        if (!value || `${value}`.trim() === "") {
            return {
                valid: false,
                message: ["El valor no puede estar vacío"],
            };
        }
        if (!this.regex.test(`${value}`)) {
            return {
                valid: false,
                message: ["El valor debe ser un número real"],
            };
        }
        return { valid: true };
    }
}
export class PriceService extends FloatService {
    minPrice;
    constructor(maxIntegers, minPrice, optionalPrice = false) {
        super(maxIntegers, optionalPrice);
        this.minPrice = minPrice;
    }
    isValid(value) {
        const validation = super.isValid(value);
        if (!validation.valid)
            return validation;
        const price = parseFloat(`${value}`);
        if (this.minPrice && price < this.minPrice) {
            return {
                valid: false,
                message: [`El valor debe ser mayor a ${this.minPrice}`],
            };
        }
        return { valid: true };
    }
}
const latRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
const lonRegex = /^[-+]?((1[0-7]\d|0?\d{1,2})(\.\d+)?|180(\.0+)?)$/;
export const latitudeService = {
    isValid(value) {
        if (!value || `${value}`.trim() === "") {
            return {
                valid: false,
                message: ["Latitud requerida"],
            };
        }
        else if (!latRegex.test(`${value}`.trim())) {
            return {
                valid: false,
                message: [
                    "La latitud debe ser un número entre -90 y 90.",
                    "Puede iniciar opcionalmente con un signo (+ o -).",
                    "La parte entera debe ser de uno o dos dígitos (o 90 en caso límite).",
                    "Si se incluye parte decimal, debe iniciarse con un punto seguido de uno o más dígitos.",
                    "Ejemplos válidos: '45.123', '-90', '+0', '89.999'.",
                ],
            };
        }
        return { valid: true };
    },
};
export const optionalLatitudeService = {
    isValid(value) {
        if (!value) {
            return { valid: true };
        }
        else if (`${value}`.trim() === "") {
            return {
                valid: false,
                message: ["Latitud requerida"],
            };
        }
        else if (!latRegex.test(`${value}`.trim())) {
            return {
                valid: false,
                message: [
                    "La latitud debe ser un número entre -90 y 90 o undefined.",
                    "Puede iniciar opcionalmente con un signo (+ o -).",
                    "La parte entera debe ser de uno o dos dígitos (o 90 en caso límite).",
                    "Si se incluye parte decimal, debe iniciarse con un punto seguido de uno o más dígitos.",
                    "Ejemplos válidos: '45.123', '-90', '+0', '89.999'.",
                ],
            };
        }
        return { valid: true };
    },
};
export const longitudeService = {
    isValid(value) {
        if (!value || `${value}`.trim() === "") {
            return {
                valid: false,
                message: ["Latitud requerida"],
            };
        }
        else if (!lonRegex.test(`${value}`.trim())) {
            return {
                valid: false,
                message: [
                    "La longitud debe ser un número entre -180 y 180.",
                    "Puede iniciar opcionalmente con un signo (+ o -).",
                    "La parte entera debe ser de uno a tres dígitos (permitiendo 180 como valor máximo).",
                    "Si se incluye parte decimal, debe iniciarse con un punto seguido de uno o más dígitos.",
                    "Ejemplos válidos: '45.123', '-180', '+0', '179.999'.",
                ],
            };
        }
        return { valid: true };
    },
};
export const optionalLongitudeService = {
    isValid(value) {
        if (!value) {
            return { valid: true };
        }
        else if (`${value}`.trim() === "") {
            return {
                valid: false,
                message: ["Latitud requerida"],
            };
        }
        else if (!lonRegex.test(`${value}`.trim())) {
            return {
                valid: false,
                message: [
                    "La longitud debe ser un número entre -180 y 180.",
                    "Puede iniciar opcionalmente con un signo (+ o -).",
                    "La parte entera debe ser de uno a tres dígitos (permitiendo 180 como valor máximo).",
                    "Si se incluye parte decimal, debe iniciarse con un punto seguido de uno o más dígitos.",
                    "Ejemplos válidos: '45.123', '-180', '+0', '179.999'.",
                ],
            };
        }
        return { valid: true };
    },
};
