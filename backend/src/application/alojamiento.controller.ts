import Controller from "./http.controller.js";
import Repository from "../application/repository.js";
import Search from "../domain/value_objects/search.js";
import {
  NewAlojamiento,
  Alojamiento,
  AlojamientoCriteria,
  AlojamientoJson,
  AlojamientoCriteriaJson,
} from "../domain/entities/alojamiento.js";
import { nameService } from "../domain/services/name.service.js";
import {
  intOrZeroService,
  intService,
} from "../domain/services/int.service.js";
import { PriceService } from "../domain/services/float.service.js";

const precioPorNocheService = new PriceService(10, 3500);

export default class AlojamientoController extends Controller<
  AlojamientoJson,
  AlojamientoCriteriaJson,
  Alojamiento,
  NewAlojamiento,
  number,
  AlojamientoCriteria
> {
  constructor(
    repo: Repository<Alojamiento, NewAlojamiento, number, AlojamientoCriteria>,
  ) {
    super(repo);
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
    const errors: Array<Object | undefined> = [];

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

    const albercaV = intOrZeroService.isValid(alberca);
    if (!albercaV.valid) {
      errors.push({
        field: "alberca",
        message: albercaV.message,
      });
    }

    const cocinaV = intOrZeroService.isValid(cocina);
    if (!cocinaV.valid) {
      errors.push({
        field: "cocina",
        message: cocinaV.message,
      });
    }

    const wifiV = intOrZeroService.isValid(wifi);
    if (!wifiV.valid) {
      errors.push({
        field: "wifi",
        message: wifiV.message,
      });
    }

    const televisionV = intOrZeroService.isValid(television);
    if (!televisionV.valid) {
      errors.push({
        field: "television",
        message: televisionV.message,
      });
    }

    const aire_acondicionadoV = intOrZeroService.isValid(aire_acondicionado);
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

    return this.repo.add(newData);
  }

  public update(data: AlojamientoJson): Promise<Alojamiento> {
    return this.repo.update(data);
  }

  public delete(id: number): Promise<Alojamiento> {
    return this.repo.delete(id);
  }

  public get(id: number): Promise<Alojamiento | null | undefined> {
    return this.repo.get(id);
  }

  public getBy(
    data: AlojamientoCriteriaJson,
  ): Promise<Search<Alojamiento, AlojamientoCriteria>> {
    return this.repo.getBy(criteria, page);
  }
}
