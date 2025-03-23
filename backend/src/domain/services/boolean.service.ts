import Service from "./service.js";

const regex = /^(true|false)$/;

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

export const instanceBool = (value: unknown) =>
  `${value}`.trim().toLowerCase() === "true";

export const instanceOptionalBool = (value?: unknown) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  return `${value}`.trim().toLowerCase() === "true";
};
