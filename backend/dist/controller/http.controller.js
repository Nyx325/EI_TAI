import { Err, Ok } from "neverthrow";
import { z } from "zod";
import { extractErrors } from "../model/parsers/zod.parser.js";
export default class HttpController {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async get(id) {
        const result = this.intIdSchema.safeParse({ id });
        if (!result.success) {
            return new Err(extractErrors(result.error));
        }
        const record = await this.repo.get(result.data.id);
        const response = record ? this.modelToJson(record) : undefined;
        return new Ok(response);
    }
    async delete(id) {
        const result = await this.intExistsSchema.safeParseAsync({ id });
        if (!result.success) {
            return new Err(extractErrors(result.error));
        }
        const deleted = await this.repo.delete(result.data.id);
        return new Ok(this.modelToJson(deleted));
    }
    /** ZOD VALIDATION SCHEMAS */
    intIdSchema = z.object({
        id: z.coerce
            .number()
            .int("El ID debe ser un número entero")
            .positive("El ID debe ser un número positivo"),
    });
    intExistsSchema = z.object({
        id: z.coerce
            .number()
            .int("El ID debe ser un número entero")
            .positive("El ID debe ser un número positivo")
            .refine(async (id) => await this.repo.get(id), "No se encontró el registro"),
    });
}
