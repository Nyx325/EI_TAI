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

  public add(newData: AlojamientoJson): Promise<Alojamiento> {
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
