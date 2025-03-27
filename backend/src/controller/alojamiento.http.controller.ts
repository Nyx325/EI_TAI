import { SearchMode } from "../model/value_object/searchable.string.js";
import { Err, Ok, Result } from "neverthrow";
import Search from "../model/value_object/search.js";
import HttpController from "./http.controller.js";
import Repository from "../model/repository/repository.js";
import JsonError from "../model/value_object/json.error.js";
import { z } from "zod";
import { extractErrors } from "../model/parsers/zod.parser.js";
import {
  Alojamiento,
  NewAlojamiento,
  AlojamientoCriteria,
} from "../model/entity/alojamiento.js";
import { alojamientoToJson } from "../model/parsers/alojamiento.parser.js";

export default class AlojamientoController extends HttpController<
  Alojamiento,
  NewAlojamiento,
  number,
  AlojamientoCriteria
> {
  constructor(
    repo: Repository<Alojamiento, NewAlojamiento, number, AlojamientoCriteria>,
  ) {
    super(repo);
    this.parseJson = alojamientoToJson;
  }

  public async add(data: unknown): Promise<Result<unknown, JsonError[]>> {
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

    return new Ok(this.parseJson(newRecord));
  }

  public async update(data: unknown): Promise<Result<unknown, JsonError[]>> {
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

    return new Ok(this.parseJson(updated));
  }

  public async getBy(
    criteria: unknown,
  ): Promise<Result<Search<unknown, unknown>, JsonError[]>> {
    const validation = this.criteriaSchema.safeParse(criteria);
    if (!validation.success) {
      return new Err(extractErrors(validation.error));
    }

    const { page, descripcion, ...c } = validation.data;
    const search = await this.repo.getBy(
      {
        descripcion: descripcion
          ? {
              mode: SearchMode.LIKE,
              str: descripcion,
            }
          : undefined,
        ...c,
      },
      page,
    );

    const { result, ...s } = search;
    return new Ok({
      ...s,
      result: result.map(this.parseJson),
    });
  }

  /** VALIDATION ZOD SCHEMAS */
  protected newSchema = z.object({
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

  protected updateSchema = this.newSchema.merge(this.intExistsSchema);

  protected criteriaSchema = z.object({
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
