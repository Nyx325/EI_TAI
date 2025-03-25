import { z } from "zod";
import HttpController from "./http.controller.js";
import Repository from "../../application/repository.js";
import Search from "../../domain/value_objects/search.js";
import JsonResponse from "../../domain/exceptions/json.response.js";
import { SearchMode } from "../../domain/value_objects/string.criteria.js";
import { alojamientoToAlojamientoJson } from "../parser/alojamiento.json.js";
import {
  NewAlojamiento,
  Alojamiento,
  AlojamientoCriteria,
  AlojamientoJson,
  AlojamientoCriteriaQuery,
} from "../../domain/entities/alojamiento.js";
import { intService } from "../../domain/services/int.service.js";
import { handleZodError } from "../handler/zod.handler.js";


export default class AlojamientoController extends HttpController<
  AlojamientoJson,
  AlojamientoCriteriaQuery,
  Alojamiento,
  NewAlojamiento,
  number,
  AlojamientoCriteria
> {
  protected newAlojamientoSchema = z.object({
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

  protected alojamientoSchema = this.newAlojamientoSchema.extend({
    id: z.number().int().positive("ID inválido").refine(async (id) =>{
      const record = await this.repo.get(id);
      return record
    }, "No se encontró el registro"),
  });

  protected criteriaSchema = z.object({
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

  constructor(
    repo: Repository<Alojamiento, NewAlojamiento, number, AlojamientoCriteria>
  ) {
    super(repo);
  }

  protected validateNewAlojamiento(data: AlojamientoJson) {
    const result = this.newAlojamientoSchema.safeParse(data);
    if (!result.success) handleZodError(result.error);
  }

  protected async validateAlojamiento(data: AlojamientoJson) {
    const result = await this.alojamientoSchema.safeParseAsync(data);
    if (!result.success) handleZodError(result.error);
  }

  public async add(data: AlojamientoJson): Promise<AlojamientoJson> {
    this.validateNewAlojamiento(data);

    const newRecord = await this.repo.add({
      longitud: data.longitud as number,
      latitud: data.latitud as number,
      aireAcondicionado: data.aire_acondicionado as boolean,
      alberca: data.alberca as boolean,
      banios: data.banios as number,
      cocina: data.cocina as boolean,
      descripcion: data.descripcion as string,
      precioPorNoche: data.precio_por_noche as number,
      television: data.television as boolean,
      wifi: data.wifi as boolean,
    });

    return alojamientoToAlojamientoJson(newRecord);
  }

  public async update(data: AlojamientoJson): Promise<AlojamientoJson> {
    await this.validateAlojamiento(data);

    const updated = await this.repo.update({
      id: data.id as number,
      longitud: data.longitud as number,
      latitud: data.latitud as number,
      aireAcondicionado: data.aire_acondicionado as boolean,
      alberca: data.alberca as boolean,
      banios: data.banios as number,
      cocina: data.cocina as boolean,
      descripcion: data.descripcion as string,
      precioPorNoche: data.precio_por_noche as number,
      television: data.television as boolean,
      wifi: data.wifi as boolean,
    });

    return alojamientoToAlojamientoJson(updated);
  }

  public async getBy(
    query: AlojamientoCriteriaQuery
  ): Promise<Search<AlojamientoJson, AlojamientoCriteria>> {
    const result = this.criteriaSchema.safeParse(query);
    if (!result.success) handleZodError(result.error);

    if (!result.data) throw new Error();

    const criteria = result.data;
    const search = await this.repo.getBy(
      {
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
      },
      criteria.page
    );

    return {
      ...search,
      result: search.result.map(alojamientoToAlojamientoJson),
    };
  }

  public async delete(id?: unknown): Promise<AlojamientoJson> {
    this.validateId(id);
    const deleted = await this.repo.delete(Number(id));
    return alojamientoToAlojamientoJson(deleted);
  }

  public async get(id?: unknown): Promise<AlojamientoJson | null | undefined> {
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
