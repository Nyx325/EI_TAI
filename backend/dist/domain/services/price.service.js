export class PriceService {
    optionalPrice;
    minPrice;
    regex;
    constructor(maxIntegers, minPrice, optionalPrice = false) {
        this.regex = new RegExp(`^\\d{1,${maxIntegers}}(?:\\.\\d+)?$`);
        this.minPrice = minPrice;
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
        const price = parseFloat(`${value}`);
        if (this.minPrice && price >= this.minPrice) {
            return {
                valid: false,
                message: [`El valor debe ser mayor a ${this.minPrice}`],
            };
        }
        return { valid: true };
    }
}
