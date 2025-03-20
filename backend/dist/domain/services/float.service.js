export class FloatService {
    optionalPrice;
    regex;
    constructor(maxIntegers, optionalPrice = false) {
        this.regex = new RegExp(`^\\d{1,${maxIntegers}}(?:\\.\\d+)?$`);
        this.optionalPrice = optionalPrice;
    }
    isValid(value) {
        if (!this.optionalPrice && (!value || `${value}`.trim() === "")) {
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
