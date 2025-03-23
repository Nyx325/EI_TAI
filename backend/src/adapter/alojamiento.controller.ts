import HttpController from "./http.controller.js";
import Repository from "../application/repository.js";
import Search from "../domain/value_objects/search.js";
import JsonResponse from "../domain/exceptions/json.response.js";
import { SearchMode } from "../domain/value_objects/string.criteria.js";

import {
  NewAlojamiento,
  Alojamiento,
  AlojamientoCriteria,
  AlojamientoJson,
  AlojamientoCriteriaJson,
} from "../domain/entities/alojamiento.js";

import {
  intService,
  optionalIntOrZeroService,
  optionalIntService,
} from "../domain/services/int.service.js";

import {
  latitudeService,
  longitudeService,
  optionalLatitudeService,
  optionalLongitudeService,
  PriceService,
} from "../domain/services/float.service.js";

import {
  booleanService,
  optionalBooleanService,
  instanceBool,
  instanceOptionalBool,
} from "../domain/services/boolean.service.js";

const precioPorNocheService = new PriceService(10, 3500);
const optionalPrecioPorNocheService = new PriceService(10, undefined, true);

export default class AlojamientoController extends HttpController<
  AlojamientoJson,
  AlojamientoCriteriaJson,
  Alojamiento,
  NewAlojamiento,
  number,
  AlojamientoCriteria
> {
  constructor(
    repo: Repository<Alojamiento, NewAlojamiento, number, AlojamientoCriteria>
  ) {
    super(repo);
  }

  protected validateId(id?: unknown) {
    const { valid, message } = intService.isValid(id);
    if (!valid) {
      throw new JsonResponse([
        {
          field: "id",
          message,
        },
      ]);
    }

    this.repo.get(Number(id)).then((search) => {
      if (!search) {
        throw new JsonResponse([
          {
            field: "id",
            message: "Registro no encontrado",
          },
        ]);
      }
    });
  }

  protected validateNewAlojamiento({
    descripcion,
    banios,
    alberca,
    cocina,
    wifi,
    television,
    aire_acondicionado,
    precio_por_noche,
    latitud,
    longitud,
  }: AlojamientoJson) {
    const errors: object[] = [];

    if (!descripcion || `${descripcion}`.trim() === "") {
      errors.push({
        field: "descripcion",
        message: "Descripción requerida",
      });
    }

    const baniosV = intService.isValid(banios);
    if (!baniosV.valid) {
      errors.push({
        field: "banios",
        message: baniosV.message,
      });
    }

    const albercaV = booleanService.isValid(alberca);
    if (!albercaV.valid) {
      errors.push({
        field: "alberca",
        message: albercaV.message,
      });
    }

    const cocinaV = booleanService.isValid(cocina);
    if (!cocinaV.valid) {
      errors.push({
        field: "cocina",
        message: cocinaV.message,
      });
    }

    const wifiV = booleanService.isValid(wifi);
    if (!wifiV.valid) {
      errors.push({
        field: "wifi",
        message: wifiV.message,
      });
    }

    const televisionV = booleanService.isValid(television);
    if (!televisionV.valid) {
      errors.push({
        field: "television",
        message: televisionV.message,
      });
    }

    const aire_acondicionadoV = booleanService.isValid(aire_acondicionado);
    if (!aire_acondicionadoV.valid) {
      errors.push({
        field: "aire_acondicionado",
        message: aire_acondicionadoV.message,
      });
    }

    const precio_por_nocheV = precioPorNocheService.isValid(precio_por_noche);
    if (!precio_por_nocheV.valid) {
      errors.push({
        field: "precio_por_noche",
        message: precio_por_nocheV.message,
      });
    }

    const longitudV = longitudeService.isValid(longitud);
    if (!longitudV.valid) {
      errors.push({
        field: "longitud",
        message: longitudV.message,
      });
    }

    const latitudV = latitudeService.isValid(latitud);
    if (!latitudV.valid) {
      errors.push({
        field: "latitud",
        message: latitudV.message,
      });
    }

    if (errors.length !== 0) {
      throw new JsonResponse(errors);
    }
  }

  protected validateAlojamiento({
    id,
    descripcion,
    banios,
    alberca,
    cocina,
    wifi,
    television,
    aire_acondicionado,
    precio_por_noche,
    latitud,
    longitud,
  }: AlojamientoJson) {
    const errors: object[] = [];

    try {
      this.validateId(id);
    } catch (e) {
      if (e instanceof JsonResponse) {
        errors.push(e.errors);
      }
    }

    try {
      this.validateNewAlojamiento({
        descripcion,
        banios,
        alberca,
        cocina,
        wifi,
        television,
        aire_acondicionado,
        precio_por_noche,
        latitud,
        longitud,
      });
    } catch (e) {
      if (e instanceof JsonResponse) {
        errors.push(e.errors);
      }
    }

    if (errors.length !== 0) {
      throw new JsonResponse(errors);
    }
  }

  public add({
    descripcion,
    banios,
    alberca,
    cocina,
    wifi,
    television,
    aire_acondicionado,
    precio_por_noche,
    latitud,
    longitud,
  }: AlojamientoJson): Promise<Alojamiento> {
    this.validateNewAlojamiento({
      descripcion,
      banios,
      alberca,
      cocina,
      wifi,
      television,
      aire_acondicionado,
      precio_por_noche,
      latitud,
      longitud,
    });

    return this.repo.add({
      longitud: Number(longitud),
      latitud: Number(latitud),
      aireAcondicionado: instanceBool(aire_acondicionado),
      alberca: instanceBool(alberca),
      banios: Number(banios),
      cocina: instanceBool(cocina),
      descripcion: `${descripcion}`,
      precioPorNoche: Number(precio_por_noche),
      television: instanceBool(television),
      wifi: instanceBool(wifi),
    });
  }

  public update({
    id,
    descripcion,
    banios,
    alberca,
    cocina,
    wifi,
    television,
    aire_acondicionado,
    precio_por_noche,
    latitud,
    longitud,
  }: AlojamientoJson): Promise<Alojamiento> {
    this.validateAlojamiento({
      id,
      descripcion,
      banios,
      alberca,
      cocina,
      wifi,
      television,
      aire_acondicionado,
      precio_por_noche,
      latitud,
      longitud,
    });

    return this.repo.update({
      id: Number(id),
      longitud: Number(longitud),
      latitud: Number(latitud),
      aireAcondicionado: instanceBool(aire_acondicionado),
      alberca: instanceBool(alberca),
      banios: Number(banios),
      cocina: instanceBool(cocina),
      descripcion: `${descripcion}`,
      precioPorNoche: Number(precio_por_noche),
      television: instanceBool(television),
      wifi: instanceBool(wifi),
    });
  }

  public async delete(id?: unknown): Promise<Alojamiento> {
    this.validateId(id);
    return this.repo.delete(Number(id));
  }

  public get(id?: unknown): Promise<Alojamiento | null | undefined> {
    const { valid, message } = intService.isValid(id);
    if (!valid) {
      throw new JsonResponse([
        {
          field: "id",
          message,
        },
      ]);
    }

    return this.repo.get(Number(id));
  }

  public getBy({
    descripcion,
    banios,
    alberca,
    cocina,
    wifi,
    television,
    aireAcondicionado,
    precioPorNoche,
    latitud,
    longitud,
    page,
  }: AlojamientoCriteriaJson): Promise<
    Search<Alojamiento, AlojamientoCriteria>
  > {
    const errors: object[] = [];

    const baniosV = optionalIntOrZeroService.isValid(banios);
    if (!baniosV.valid) {
      errors.push({
        field: "banios",
        message: baniosV.message,
      });
    }

    const albercaV = optionalBooleanService.isValid(alberca);
    if (!albercaV.valid) {
      errors.push({
        field: "alberca",
        message: albercaV.message,
      });
    }

    const cocinaV = optionalBooleanService.isValid(cocina);
    if (!cocinaV.valid) {
      errors.push({
        field: "cocina",
        message: cocinaV.message,
      });
    }

    const wifiV = optionalBooleanService.isValid(wifi);
    if (!wifiV.valid) {
      errors.push({
        field: "wifi",
        message: wifiV.message,
      });
    }

    const televisionV = optionalBooleanService.isValid(television);
    if (!televisionV.valid) {
      errors.push({
        field: "television",
        message: televisionV.message,
      });
    }

    const aireAcondicionadoV =
      optionalBooleanService.isValid(aireAcondicionado);
    if (!aireAcondicionadoV.valid) {
      errors.push({
        field: "aireAcondicionado",
        message: aireAcondicionadoV.message,
      });
    }

    const precioPorNocheV =
      optionalPrecioPorNocheService.isValid(precioPorNoche);
    if (!precioPorNocheV.valid) {
      errors.push({
        field: "precioPorNoche",
        message: precioPorNocheV.message,
      });
    }

    const latitudV = optionalLatitudeService.isValid(latitud);
    if (!latitudV.valid) {
      errors.push({
        field: "latitud",
        message: latitudV.message,
      });
    }

    const longitudV = optionalLongitudeService.isValid(longitud);
    if (!longitudV.valid) {
      errors.push({
        field: "longitud",
        message: longitudV.message,
      });
    }

    const pageV = optionalIntService.isValid(page);
    if (!pageV.valid) {
      errors.push({
        field: "page",
        message: pageV.message,
      });
    }

    if (errors.length !== 0) {
      throw new JsonResponse(errors);
    }

    return this.repo.getBy(
      {
        descripcion: descripcion
          ? {
              mode: SearchMode.LIKE,
              str: `${descripcion}`,
            }
          : undefined,
        banios: banios ? Number(banios) : undefined,
        alberca: instanceOptionalBool(alberca),
        cocina: instanceOptionalBool(cocina),
        wifi: instanceOptionalBool(wifi),
        television: instanceOptionalBool(television),
        aireAcondicionado: instanceOptionalBool(aireAcondicionado),
        precioPorNoche: precioPorNoche ? Number(precioPorNoche) : undefined,
        latitud: latitud ? Number(latitud) : undefined,
        longitud: longitud ? Number(longitud) : undefined,
      },
      Number(`${page ?? 1}`)
    );
  }
}
