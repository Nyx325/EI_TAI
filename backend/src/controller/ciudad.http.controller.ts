import HttpController from "./http.controller.js";
import { Ciudad, NuevaCiudad, CiudadCriteria } from "../model/entity/ciudad.js";
import Repository from "../model/repository/repository.js";
import { Err, Ok, Result } from "neverthrow";
import JsonError from "../model/value_object/json.error.js";
import Search from "../model/value_object/search.js";
import { z } from "zod";
import { SearchMode } from "../model/value_object/searchable.string.js";
import { extractErrors } from "../model/parsers/zod.parser.js";
import { Estado, EstadoCriteria, NuevoEstado } from "../model/entity/estado.js";

export default class CiudadController extends HttpController<
  Ciudad,
  NuevaCiudad,
  number,
  CiudadCriteria
> {
  protected edoRepo;

  constructor(
    repo: Repository<Ciudad, NuevaCiudad, number, CiudadCriteria>,
    edoRepo: Repository<Estado, NuevoEstado, number, EstadoCriteria>,
  ) {
    super(repo);
    this.edoRepo = edoRepo;
  }
  public async add(data: unknown): Promise<Result<unknown, JsonError[]>> {
    const validation = await this.newSchema.safeParseAsync(data);
    if (!validation.success) {
      const error = extractErrors(validation.error);
      return new Err(error);
    }

    const { estado_id, ...restD } = validation.data;
    const newRecord = await this.repo.add({
      estadoId: estado_id,
      ...restD,
    });

    return new Ok(this.parseJson(newRecord));
  }
  public async update(data: unknown): Promise<Result<unknown, JsonError[]>> {
    const validation = await this.updateSchema.safeParseAsync(data);
    if (!validation.success) {
      const error = extractErrors(validation.error);
      return new Err(error);
    }

    const { estado_id, ...restD } = validation.data;
    const updated = await this.repo.add({
      estadoId: estado_id,
      ...restD,
    });

    return new Ok(this.parseJson(updated));
  }

  public async getBy(
    criteria: unknown,
  ): Promise<Result<Search<unknown, unknown>, JsonError[]>> {
    const validation = this.searchCriteria.safeParse(criteria);
    if (!validation.success) {
      const error = extractErrors(validation.error);
      return new Err(error);
    }

    const { page, nombre, ...c } = validation.data;
    const search = await this.repo.getBy(
      {
        nombre: nombre
          ? {
              mode: SearchMode.LIKE,
              str: nombre,
            }
          : undefined,
        ...c,
      },
      page,
    );

    const { result, ...restS } = search;
    return new Ok({
      ...restS,
      result: result.map(this.parseJson),
    });
  }

  /** ZOD VALIDATION */
  protected newSchema = z.object({
    nombre: z.coerce
      .string({ required_error: "Nombre requerido" })
      .min(1, "Nombre requerido")
      .refine(async (nombre) => {
        const search = await this.repo.getBy(
          {
            nombre: {
              mode: SearchMode.EQUALS,
              str: nombre,
            },
          },
          1,
        );

        return search.result.length === 0;
      }, "Ciudad ya registrado"),
    estado_id: z.coerce
      .number()
      .int()
      .positive()
      .refine(async (id) => {
        return (await this.edoRepo.get(id)) === undefined;
      }, "No se encontro el registro"),
  });

  protected updateSchema = this.newSchema
    .extend({})
    .merge(this.intExistsSchema)
    .refine(
      async (data) => {
        const search = await this.repo.getBy(
          {
            nombre: { mode: SearchMode.EQUALS, str: data.nombre },
          },
          1,
        );
        return search.result.every((res) => res.id === data.id);
      },
      { message: "Ya existe un estado con ese nombre" },
    );

  protected searchCriteria = z.object({
    nombre: z.coerce.string().optional(),
    estadoId: z.coerce.number().positive().optional(),
    page: z.coerce.number().int().positive().optional().default(1),
  });
}
