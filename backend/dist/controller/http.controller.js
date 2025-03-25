import { z } from "zod";
export default class HttpController {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
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
