import { z } from "zod";
import HttpController from "./http.controller.js";
import JsonResponse from "../../domain/exceptions/json.response.js";
import { SearchMode } from "../../domain/value_objects/string.criteria.js";
import { alojamientoToAlojamientoJson } from "../parser/alojamiento.json.js";
import { intService } from "../../domain/services/int.service.js";
import { handleZodError } from "../handler/zod.handler.js";
export default class AlojamientoController extends HttpController {
    newAlojamientoSchema = z.object({
        descripcion: z.string({ required_error: "Ingrese un breve texto sobre el alojamiento" }).min(1, "Ingrese un breve texto sobre el alojamiento"),
        banios: z.number().int().positive("Debe ser un entero positivo diferente de cero"),
        alberca: z.boolean({ required_error: "El valor es obligatorio ('true' o 'false')" }),
        cocina: z.boolean({ required_error: "El valor es obligatorio ('true' o 'false')" }),
        wifi: z.boolean({ required_error: "El valor es obligatorio ('true' o 'false')" }),
        television: z.boolean({ required_error: "El valor es obligatorio ('true' o 'false')" }),
        aire_acondicionado: z.boolean({ required_error: "El valor es obligatorio ('true' o 'false')" }),
        precio_por_noche: z.number()
            .min(3500, "Precio mínimo: 10"),
        latitud: z.number()
            .min(-90, "Latitud mínima: -90")
            .max(90, "Latitud máxima: 90"),
        longitud: z.number()
            .min(-180, "Longitud mínima: -180")
            .max(180, "Longitud máxima: 180"),
    });
    alojamientoSchema = this.newAlojamientoSchema.extend({
        id: z.number().int().positive("ID inválido").refine(async (id) => {
            const record = await this.repo.get(id);
            return record;
        }, "No se encontró el registro"),
    });
    criteriaSchema = z.object({
        descripcion: z.string().optional(),
        banios: z.coerce.number()
            .int("Debe ser un entero")
            .positive("Debe ser positivo")
            .optional(),
        alberca: z.coerce.boolean().optional(),
        cocina: z.coerce.boolean().optional(),
        wifi: z.coerce.boolean().optional(),
        television: z.coerce.boolean().optional(),
        aireAcondicionado: z.coerce.boolean().optional(),
        precioPorNoche: z.coerce.number()
            .min(10, "Precio mínimo: 10")
            .optional(),
        latitud: z.coerce.number()
            .min(-90, "Latitud inválida")
            .max(90, "Latitud inválida")
            .optional(),
        longitud: z.coerce.number()
            .min(-180, "Longitud inválida")
            .max(180, "Longitud inválida")
            .optional(),
        page: z.coerce.number()
            .int("Página debe ser entero")
            .positive("Página debe ser positiva")
            .optional()
            .default(1),
    });
    constructor(repo) {
        super(repo);
    }
    validateNewAlojamiento(data) {
        const result = this.newAlojamientoSchema.safeParse(data);
        if (!result.success)
            handleZodError(result.error);
    }
    async validateAlojamiento(data) {
        const result = await this.alojamientoSchema.safeParseAsync(data);
        if (!result.success)
            handleZodError(result.error);
    }
    async add(data) {
        this.validateNewAlojamiento(data);
        const newRecord = await this.repo.add({
            longitud: data.longitud,
            latitud: data.latitud,
            aireAcondicionado: data.aire_acondicionado,
            alberca: data.alberca,
            banios: data.banios,
            cocina: data.cocina,
            descripcion: data.descripcion,
            precioPorNoche: data.precio_por_noche,
            television: data.television,
            wifi: data.wifi,
        });
        return alojamientoToAlojamientoJson(newRecord);
    }
    async update(data) {
        await this.validateAlojamiento(data);
        const updated = await this.repo.update({
            id: data.id,
            longitud: data.longitud,
            latitud: data.latitud,
            aireAcondicionado: data.aire_acondicionado,
            alberca: data.alberca,
            banios: data.banios,
            cocina: data.cocina,
            descripcion: data.descripcion,
            precioPorNoche: data.precio_por_noche,
            television: data.television,
            wifi: data.wifi,
        });
        return alojamientoToAlojamientoJson(updated);
    }
    async getBy(query) {
        const result = this.criteriaSchema.safeParse(query);
        if (!result.success)
            handleZodError(result.error);
        if (!result.data)
            throw new Error();
        const criteria = result.data;
        const search = await this.repo.getBy({
            descripcion: criteria.descripcion ? {
                mode: SearchMode.LIKE,
                str: criteria.descripcion
            } : undefined,
            banios: criteria.banios,
            alberca: criteria.alberca,
            cocina: criteria.cocina,
            wifi: criteria.wifi,
            television: criteria.television,
            aireAcondicionado: criteria.aireAcondicionado,
            precioPorNoche: criteria.precioPorNoche,
            latitud: criteria.latitud,
            longitud: criteria.longitud,
        }, criteria.page);
        return {
            ...search,
            result: search.result.map(alojamientoToAlojamientoJson),
        };
    }
    async delete(id) {
        this.validateId(id);
        const deleted = await this.repo.delete(Number(id));
        return alojamientoToAlojamientoJson(deleted);
    }
    async get(id) {
        const { valid, message } = intService.isValid(id);
        if (!valid) {
            throw new JsonResponse([
                {
                    field: "id",
                    message,
                },
            ]);
        }
        const record = await this.repo.get(Number(id));
        return record ? alojamientoToAlojamientoJson(record) : undefined;
    }
}
