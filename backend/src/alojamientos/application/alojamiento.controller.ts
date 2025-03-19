import Controller from "../../common/application/controller.js";
import Repository from "../../common/application/repository.js";
import Search from "../../common/domain/value_objects/search.js";
import AlojamientoCriteria from "../domain/entities/alojamiento.criteria.js";
import Alojamiento from "../domain/entities/alojamiento.js";
import NewAlojamiento from "../domain/entities/new.alojamiento.js";

export default class AlojamientoController extends Controller<
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

  public add(newData: NewAlojamiento): Promise<Alojamiento> {
    return this.repo.add(newData);
  }

  public update(data: Alojamiento): Promise<Alojamiento> {
    return this.repo.update(data);
  }

  public delete(id: number): Promise<Alojamiento> {
    return this.repo.delete(id);
  }

  public get(id: number): Promise<Alojamiento | null | undefined> {
    return this.repo.get(id);
  }

  public getBy(
    criteria: AlojamientoCriteria,
    page: number,
  ): Promise<Search<Alojamiento, AlojamientoCriteria>> {
    return this.repo.getBy(criteria, page);
  }
}
