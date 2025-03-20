import Search from "../domain/value_objects/search.js";
import Repository from "./repository.js";

export default abstract class Controller<UM, RM, RNM, RI, RC> {
  protected repo: Repository<RM, RNM, RI, RC>;

  public constructor(repo: Repository<RM, RNM, RI, RC>) {
    this.repo = repo;
  }

  public abstract add(newData: UM): Promise<RM>;
  public abstract update(data: UM): Promise<RM>;
  public abstract delete(id: unknown): Promise<RM>;
  public abstract get(id: unknown): Promise<RM | null | undefined>;
  public abstract getBy(criteria: RC, page: number): Promise<Search<RM, RC>>;
}
