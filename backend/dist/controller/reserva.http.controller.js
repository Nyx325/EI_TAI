import { Err, Ok } from "neverthrow";
import { reservaToJson } from "../model/parsers/reserva.parser.js";
import HttpController from "./http.controller.js";
import { extractErrors } from "../model/parsers/zod.parser.js";
import { z } from "zod";
export default class ReservaController extends HttpController {
    clienteRepo;
    alojamientoRepo;
    constructor({ repo, clienteRepo, alojamientoRepo, }) {
        super(repo);
        this.clienteRepo = clienteRepo;
        this.alojamientoRepo = alojamientoRepo;
        this.parseJson = reservaToJson;
    }
    diferenciaDias(fechaMenor, fechaMayor) {
        const diaEnMs = 1000 * 60 * 60 * 24;
        const diff = fechaMayor.getTime() - fechaMenor.getTime();
        return Math.floor(diff / diaEnMs);
    }
    async calcularTotal(alojamientoId, fechaInicio, fechaFin) {
        const alojamiento = (await this.alojamientoRepo.get(alojamientoId));
        const diasDiff = this.diferenciaDias(fechaInicio, fechaFin);
        return diasDiff * alojamiento.precioPorNoche;
    }
    async add(data) {
        const validation = await this.newSchema.safeParseAsync(data);
        if (!validation.success) {
            const errors = extractErrors(validation.error);
            return new Err(errors);
        }
        const { cliente_id, alojamiento_id, ...restD } = validation.data;
        const newRecord = await this.repo.add({
            ...restD,
            clienteId: cliente_id,
            alojamientoId: alojamiento_id,
            total: await this.calcularTotal(alojamiento_id, restD.inicio, restD.fin),
        });
        return new Ok(this.parseJson(newRecord));
    }
    async update(data) {
        const validation = await this.updateSchema.safeParseAsync(data);
        if (!validation.success) {
            const errors = extractErrors(validation.error);
            return new Err(errors);
        }
        const { cliente_id, alojamiento_id, ...restD } = validation.data;
        const updated = await this.repo.update({
            ...restD,
            clienteId: cliente_id,
            alojamientoId: alojamiento_id,
            total: await this.calcularTotal(alojamiento_id, restD.inicio, restD.fin),
        });
        return new Ok(this.parseJson(updated));
    }
    async getBy(criteria) {
        const validation = this.crieriaSchema.safeParse(criteria);
        if (!validation.success) {
            const errors = extractErrors(validation.error);
            return new Err(errors);
        }
        const { page, ...c } = validation.data;
        const search = await this.repo.getBy(c, page);
        const { result, ...s } = search;
        return new Ok({
            ...s,
            result: result.map(this.parseJson),
        });
    }
    /** ZOD VALIDATION SCHEMAS */
    baseSchema = z.object({
        inicio: z.coerce
            .date()
            .refine((date) => !isNaN(date.getTime()), { message: "Fecha inválida" }),
        fin: z.coerce
            .date()
            .refine((date) => !isNaN(date.getTime()), { message: "Fecha inválida" }),
        cliente_id: z.coerce
            .number({ required_error: "Se debe proporcionar un entero positivo" })
            .int("Se debe proporcionar un entero positivo")
            .positive("Se debe proporcionar un entero positivo")
            .refine(async (id) => {
            return await this.clienteRepo.get(id);
        }, "No se encontró el registro"),
        alojamiento_id: z.coerce
            .number()
            .int()
            .refine(async (id) => {
            return await this.alojamientoRepo.get(id);
        }, "No se encontró el registro"),
    });
    newSchema = this.baseSchema
        .refine((data) => data.inicio < data.fin, {
        message: "La fecha de inicio debe ser menor que la fecha de fin",
        path: ["inicio, fin"],
    })
        .refine((data) => {
        const diff = (data.fin.getTime() - data.inicio.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 1;
    }, {
        message: "Debe haber al menos 1 día de diferencia entre inicio y fin",
        path: ["inicio, fin"],
    });
    updateSchema = this.baseSchema
        .merge(this.intExistsSchema) // Merge with the base schema BEFORE refinements
        .refine((data) => data.inicio < data.fin, {
        message: "La fecha de inicio debe ser menor que la fecha de fin",
        path: ["inicio, fin"],
    })
        .refine((data) => {
        const diff = (data.fin.getTime() - data.inicio.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 1;
    }, {
        message: "Debe haber al menos 1 día de diferencia entre inicio y fin",
        path: ["inicio, fin"],
    });
    crieriaSchema = z.object({
        inicio: z.coerce
            .date()
            .refine((date) => !isNaN(date.getTime()))
            .optional(),
        fin: z.coerce
            .date()
            .refine((date) => !isNaN(date.getTime()))
            .optional(),
        clienteId: z.coerce
            .number({ required_error: "Se debe proporcionar un entero positivo" })
            .int("Se debe proporcionar un entero positivo")
            .positive("Se debe proporcionar un entero positivo")
            .optional(),
        alojamientoId: z.coerce.number().int().optional(),
        page: z.coerce.number().int().positive().optional().default(1),
    });
}
