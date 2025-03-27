import { Err, Ok, Result } from "neverthrow";
import { NewReserva, Reserva, ReservaCriteria } from "../model/entity/reserva.js";
import { reservaToJson } from "../model/parsers/reserva.parser.js";
import Repository from "../model/repository/repository.js";
import JsonError from "../model/value_object/json.error.js";
import Search from "../model/value_object/search.js";
import HttpController from "./http.controller.js";
import { z } from "zod";
import { Cliente, ClienteCriteria, ClienteNuevo } from "../model/entity/cliente.js";
import { Alojamiento, AlojamientoCriteria, NewAlojamiento } from "../model/entity/alojamiento.js";
import { extractErrors } from "../model/parsers/zod.parser.js";

export default class ReservaController extends HttpController<
  Reserva,
  NewReserva,
  number,
  ReservaCriteria
> {

  protected clienteRepo;
  protected alojamientoRepo;

  constructor(
    repo: Repository<Reserva, NewReserva, number, ReservaCriteria>,
    clienteRepo: Repository<Cliente, ClienteNuevo, number, ClienteCriteria>,
    alojamientoRepo: Repository<Alojamiento, NewAlojamiento, number, AlojamientoCriteria>
  ) {
    super(repo);
    this.clienteRepo = clienteRepo;
    this.alojamientoRepo = alojamientoRepo;
    this.parseJson = reservaToJson;
  }

  protected diferenciaDias(fechaMenor: Date, fechaMayor: Date): number {
    const diaEnMs = 1000 * 60 * 60 * 24;
    const diff = fechaMayor.getTime() - fechaMenor.getTime();
    return Math.floor(diff / diaEnMs);
  }

  protected calcularTotal

  public async add(data: unknown): Promise<Result<unknown, JsonError[]>> {
    const validation = await this.newSchema.safeParseAsync(data);
    if (!validation.success) {
      const errors = extractErrors(validation.error);
      return new Err(errors);
    }

    const { cliente_id, alojamiento_id, ...restD } = validation.data;
    const alojamiento = await this.alojamientoRepo.get(alojamiento_id) as Alojamiento;
    const diasDiff = this.diferenciaDias(restD.fin, restD.inicio);

    const newRecord = await this.repo.add({
      ...restD,
      clienteId: cliente_id,
      alojamientoId: alojamiento_id,
      total: diasDiff * alojamiento.precioPorNoche
    });

    return new Ok(this.parseJson(newRecord));
  }
  public update(data: unknown): Promise<Result<unknown, JsonError[]>> {
    throw new Error("Method not implemented.");
  }

  public getBy(criteria: unknown): Promise<Result<Search<unknown, unknown>, JsonError[]>> {
    throw new Error("Method not implemented.");
  }

  /** ZOD VALIDATION SCHEMAS */
  protected baseSchema = z.object({
    inicio: z
      .coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), { message: "Fecha inválida" }),
    fin: z
      .coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), { message: "Fecha inválida" }),
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

  protected newSchema = this.baseSchema
    .refine((data) => data.inicio < data.fin, {
      message: "La fecha de inicio debe ser menor que la fecha de fin",
      path: ["inicio"],
    })
    .refine((data) => {
      const diff = (data.fin.getTime() - data.inicio.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 1;
    }, {
      message: "Debe haber al menos 1 día de diferencia entre inicio y fin",
      path: ["inicio"],
    });

  protected updateSchema = this.baseSchema
    .merge(this.intExistsSchema) // Merge with the base schema BEFORE refinements
    .refine((data) => data.inicio < data.fin, {
      message: "La fecha de inicio debe ser menor que la fecha de fin",
      path: ["inicio"],
    })
    .refine((data) => {
      const diff = (data.fin.getTime() - data.inicio.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 1;
    }, {
      message: "Debe haber al menos 1 día de diferencia entre inicio y fin",
      path: ["inicio"],
    });

  protected crieriaSchema = z.object({
    inicio: z
      .coerce
      .date()
      .refine((date) => !isNaN(date.getTime()))
      .optional(),
    fin: z
      .coerce
      .date()
      .refine((date) => !isNaN(date.getTime()))
      .optional(),
    clienteId: z
      .coerce
      .number({ required_error: "Se debe proporcionar un entero positivo" })
      .int("Se debe proporcionar un entero positivo")
      .positive("Se debe proporcionar un entero positivo")
      .optional(),
    alojamientoId: z
      .coerce
      .number()
      .int()
      .optional(),
  })
}
