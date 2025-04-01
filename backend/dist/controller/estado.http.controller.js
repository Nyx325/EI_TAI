import HttpController from "./http.controller.js";
import { Err, Ok } from "neverthrow";
import { z } from "zod";
import { SearchMode } from "../model/value_object/searchable.string.js";
import { extractErrors } from "../model/parsers/zod.parser.js";
export default class EstadoController extends HttpController {
    constructor(repo) {
        super(repo);
    }
    async add(data) {
        const validation = await this.newSchema.safeParseAsync(data);
        if (!validation.success) {
            const error = extractErrors(validation.error);
            return new Err(error);
        }
        const { ...restD } = validation.data;
        const newRecord = await this.repo.add({
            ...restD,
        });
        return new Ok(this.parseJson(newRecord));
    }
    async update(data) {
        const validation = await this.updateSchema.safeParseAsync(data);
        if (!validation.success) {
            const error = extractErrors(validation.error);
            return new Err(error);
        }
        const { ...restD } = validation.data;
        const updated = await this.repo.add({
            ...restD,
        });
        return new Ok(this.parseJson(updated));
    }
    async getBy(criteria) {
        const validation = this.searchCriteria.safeParse(criteria);
        if (!validation.success) {
            const error = extractErrors(validation.error);
            return new Err(error);
        }
        const { page, nombre, ...c } = validation.data;
        const search = await this.repo.getBy({
            nombre: nombre
                ? {
                    mode: SearchMode.LIKE,
                    str: nombre,
                }
                : undefined,
            ...c,
        }, page);
        const { result, ...restS } = search;
        return new Ok({
            ...restS,
            result: result.map(this.parseJson),
        });
    }
    /** ZOD VALIDATION */
    newSchema = z.object({
        nombre: z.coerce
            .string({ required_error: "Nombre requerido" })
            .min(1, "Nombre requerido")
            .refine(async (nombre) => {
            const search = await this.repo.getBy({
                nombre: {
                    mode: SearchMode.EQUALS,
                    str: nombre,
                },
            }, 1);
            return search.result.length === 0;
        }, "Estado ya registrado"),
    });
    updateSchema = z
        .object({
        nombre: z
            .string({ required_error: "Nombre requerido" })
            .min(1, "Nombre requerido"),
    })
        .merge(this.intExistsSchema)
        .refine(async (data) => {
        const search = await this.repo.getBy({
            nombre: { mode: SearchMode.EQUALS, str: data.nombre },
        }, 1);
        return search.result.every((res) => res.id === data.id);
    }, { message: "Ya existe un estado con ese nombre" });
    searchCriteria = z.object({
        nombre: z.coerce.string().optional(),
        page: z.coerce.number().int().positive().optional().default(1),
    });
}
