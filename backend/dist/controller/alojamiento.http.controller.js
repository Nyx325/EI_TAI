import { SearchMode } from "../model/value_object/searchable.string.js";
import { Err, Ok } from "neverthrow";
import HttpController from "./http.controller.js";
import { z } from "zod";
import { extractErrors } from "../model/parsers/zod.parser.js";
export default class AlojamientoController extends HttpController {
    constructor(repo) {
        super(repo);
    }
    modelToJson(data) {
        const { precioPorNoche, aireAcondicionado, ...restData } = data;
        return {
            ...restData,
            precio_por_noche: precioPorNoche,
            aire_acondicionado: aireAcondicionado,
        };
    }
    async add(data) {
        const result = this.newSchema.safeParse(data);
        if (!result.success) {
            return new Err(extractErrors(result.error));
        }
        const { precio_por_noche, aire_acondicionado, ...restData } = result.data;
        const newRecord = await this.repo.add({
            aireAcondicionado: aire_acondicionado,
            precioPorNoche: precio_por_noche,
            ...restData,
        });
        return new Ok(this.modelToJson(newRecord));
    }
    async update(data) {
        const result = await this.updateSchema.safeParseAsync(data);
        if (!result.success) {
            return new Err(extractErrors(result.error));
        }
        const { precio_por_noche, aire_acondicionado, ...restData } = result.data;
        const updated = await this.repo.update({
            aireAcondicionado: aire_acondicionado,
            precioPorNoche: precio_por_noche,
            ...restData,
        });
        return new Ok(this.modelToJson(updated));
    }
    async getBy(criteria) {
        const validation = this.criteriaSchema.safeParse(criteria);
        if (!validation.success) {
            return new Err(extractErrors(validation.error));
        }
        const { page, descripcion, ...c } = validation.data;
        const search = await this.repo.getBy({
            descripcion: descripcion
                ? {
                    mode: SearchMode.LIKE,
                    str: descripcion,
                }
                : undefined,
            ...c,
        }, page);
        const { result, ...s } = search;
        return new Ok({
            ...s,
            result: result.map(this.modelToJson),
        });
    }
    /** VALIDATION ZOD SCHEMAS */
    newSchema = z.object({
        descripcion: z
            .string({ required_error: "Ingrese un breve texto sobre el alojamiento" })
            .min(1, "Ingrese un breve texto sobre el alojamiento"),
        banios: z
            .number({ required_error: "Ingrese el número de baños del alojamiento" })
            .int("Debe ser un entero positivo diferente de cero")
            .positive("Debe ser un entero positivo diferente de cero"),
        alberca: z.boolean({
            required_error: "El valor es obligatorio ('true' o 'false')",
        }),
        cocina: z.boolean({
            required_error: "El valor es obligatorio ('true' o 'false')",
        }),
        wifi: z.boolean({
            required_error: "El valor es obligatorio ('true' o 'false')",
        }),
        television: z.boolean({
            required_error: "El valor es obligatorio ('true' o 'false')",
        }),
        aire_acondicionado: z.boolean({
            required_error: "El valor es obligatorio ('true' o 'false')",
        }),
        precio_por_noche: z
            .number({ required_error: "Debe ingresar un número" })
            .min(3500, "Precio mínimo: 3500"),
        latitud: z
            .number({
            required_error: "Debe ingresar un número real entre -90 y +90",
        })
            .min(-90, "Latitud mínima: -90")
            .max(90, "Latitud máxima: 90"),
        longitud: z
            .number({
            required_error: "Debe ingresar un número real entre -180 y +180",
        })
            .min(-180, "Longitud mínima: -180")
            .max(180, "Longitud máxima: 180"),
    });
    updateSchema = this.newSchema.merge(this.intExistsSchema);
    criteriaSchema = z.object({
        descripcion: z.string().optional(),
        banios: z.coerce
            .number()
            .int("Debe ser un entero")
            .positive("Debe ser positivo")
            .optional(),
        alberca: z.coerce.boolean().optional(),
        cocina: z.coerce.boolean().optional(),
        wifi: z.coerce.boolean().optional(),
        television: z.coerce.boolean().optional(),
        aireAcondicionado: z.coerce.boolean().optional(),
        precioPorNoche: z.coerce.number().min(10, "Precio mínimo: 10").optional(),
        latitud: z.coerce
            .number()
            .min(-90, "Latitud inválida")
            .max(90, "Latitud inválida")
            .optional(),
        longitud: z.coerce
            .number()
            .min(-180, "Longitud inválida")
            .max(180, "Longitud inválida")
            .optional(),
        page: z.coerce
            .number()
            .int("Página debe ser entero")
            .positive("Página debe ser positiva")
            .optional()
            .default(1),
    });
}
