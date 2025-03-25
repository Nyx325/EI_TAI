import Service, { ServiceValidation } from "./service.js";

/**
 * Servicio para validar valores numéricos flotantes en formato string.
 * Permite configurar la cantidad máxima de dígitos enteros y si el valor es opcional.
 *
 * @class FloatService
 * @implements {Service<unknown>}
 */
export class FloatService implements Service<unknown> {
  /**
   * Indica si el valor es opcional.
   * @private
   * @type {boolean}
   */
  private optional: boolean;

  /**
   * Expresión regular para validar números reales con una cantidad máxima de dígitos enteros.
   * @private
   * @type {RegExp}
   */
  private regex: RegExp;

  /**
   * Crea una instancia de FloatService.
   *
   * @param {number} maxIntegers - Máximo número de dígitos enteros permitidos.
   * @param {boolean} [optional=false] - Indica si el valor es opcional.
   */
  constructor(maxIntegers: number, optional: boolean = false) {
    this.regex = new RegExp(`^\\d{1,${maxIntegers}}(?:\\.\\d+)?$`);
    this.optional = optional;
  }

  /**
   * Valida que el valor sea un número real.
   *
   * Si el servicio es opcional y no se proporciona valor, se considera válido.
   * En caso contrario, se valida que el valor no esté vacío y cumpla con el formato requerido.
   *
   * @param {unknown} [value] - Valor a validar.
   * @returns {ServiceValidation} Resultado de la validación.
   */
  isValid(value?: unknown): ServiceValidation {
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

/**
 * Servicio para validar precios.
 * Extiende la validación de FloatService y adicionalmente verifica que el precio cumpla un mínimo establecido.
 *
 * @class PriceService
 * @extends {FloatService}
 */
export class PriceService extends FloatService {
  /**
   * Precio mínimo permitido.
   * @private
   * @type {number | undefined}
   */
  private minPrice?: number;

  /**
   * Crea una instancia de PriceService.
   *
   * @param {number} maxIntegers - Máximo número de dígitos enteros permitidos para el precio.
   * @param {number} [minPrice] - Precio mínimo permitido.
   * @param {boolean} [optionalPrice=false] - Indica si el precio es opcional.
   */
  constructor(
    maxIntegers: number,
    minPrice?: number,
    optionalPrice: boolean = false
  ) {
    super(maxIntegers, optionalPrice);
    this.minPrice = minPrice;
  }

  /**
   * Valida que el precio sea un número real y, si se define, que sea mayor o igual al precio mínimo.
   *
   * @param {unknown} [value] - Valor del precio a validar.
   * @returns {ServiceValidation} Resultado de la validación.
   */
  isValid(value?: unknown): ServiceValidation {
    const validation = super.isValid(value);
    if (!validation.valid) return validation;

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

/**
 * Expresión regular para validar latitudes.
 * La latitud debe ser un número entre -90 y 90, opcionalmente precedido por un signo y con parte decimal.
 *
 * @constant {RegExp}
 */
const latRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;

/**
 * Expresión regular para validar longitudes.
 * La longitud debe ser un número entre -180 y 180, opcionalmente precedido por un signo y con parte decimal.
 *
 * @constant {RegExp}
 */
const lonRegex = /^[-+]?((1[0-7]\d|0?\d{1,2})(\.\d+)?|180(\.0+)?)$/;

/**
 * Servicio para validar latitudes.
 *
 * Valida que el valor no esté vacío y cumpla con el formato numérico requerido para latitudes.
 *
 * @type {Service<unknown>}
 */
export const latitudeService: Service<unknown> = {
  isValid(value) {
    if (!value || `${value}`.trim() === "") {
      return {
        valid: false,
        message: ["Latitud requerida"],
      };
    } else if (!latRegex.test(`${value}`.trim())) {
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

/**
 * Servicio para validar latitudes de manera opcional.
 *
 * Si el valor no se proporciona, se considera válido. En caso de estar presente, se valida el formato.
 *
 * @type {Service<unknown>}
 */
export const optionalLatitudeService: Service<unknown> = {
  isValid(value) {
    if (!value) {
      return { valid: true };
    } else if (`${value}`.trim() === "") {
      return {
        valid: false,
        message: ["Latitud requerida"],
      };
    } else if (!latRegex.test(`${value}`.trim())) {
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

/**
 * Servicio para validar longitudes (coordenadas).
 *
 * Valida que el valor no esté vacío y cumpla con el formato numérico requerido para longitudes.
 *
 * @type {Service<unknown>}
 */
export const longitudeService: Service<unknown> = {
  isValid(value) {
    if (!value || `${value}`.trim() === "") {
      return {
        valid: false,
        message: ["Latitud requerida"],
      };
    } else if (!lonRegex.test(`${value}`.trim())) {
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

/**
 * Servicio para validar longitudes (coordenadas) de manera opcional.
 *
 * Si el valor no se proporciona, se considera válido. En caso de estar presente, se valida el formato.
 *
 * @type {Service<unknown>}
 */
export const optionalLongitudeService: Service<unknown> = {
  isValid(value) {
    if (!value) {
      return { valid: true };
    } else if (`${value}`.trim() === "") {
      return {
        valid: false,
        message: ["Latitud requerida"],
      };
    } else if (!lonRegex.test(`${value}`.trim())) {
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
