import { reservaToJson } from "../model/parsers/reserva.parser.js";
import HttpController from "./http.controller.js";
import { z } from "zod";
export default class ReservaController extends HttpController {
    clienteRepo;
    alojamientoRepo;
    constructor(repo, clienteRepo, alojamientoRepo) {
        super(repo);
        this.clienteRepo = clienteRepo;
        this.alojamientoRepo = alojamientoRepo;
        this.parseJson = reservaToJson;
    }
    add(data) {
        throw new Error("Method not implemented.");
    }
    update(data) {
        throw new Error("Method not implemented.");
    }
    getBy(criteria) {
        throw new Error("Method not implemented.");
    }
    /** ZOD VALIDATION SCHEMAS */
    newSchema = z.object({
        inicio: z
            .coerce
            .date()
            .refine((date) => !isNaN(date.getTime())),
        fin: z
            .coerce
            .date()
            .refine((date) => !isNaN(date.getTime())),
        cliente_id: z
            .coerce
            .number({ required_error: "Se debe proporcionar un entero positivo" })
            .int("Se debe proporcionar un entero positivo")
            .positive("Se debe proporcionar un entero positivo")
            .refine(async (id) => {
            return await this.clienteRepo.get(id);
        }, "No se encontró el registro"),
        alojamiento_id: z
            .coerce
            .number()
            .int()
            .refine(async (id) => {
            return await this.alojamientoRepo.get(id);
        }, "No se encontró el registro"),
    });
}
