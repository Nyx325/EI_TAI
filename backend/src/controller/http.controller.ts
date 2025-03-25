import { Result } from "neverthrow";
import JsonError from "../model/value_object/json.error.js";
import Repository from "../model/repository/repository.js";
import Search from "../model/value_object/search.js";

export default abstract class HttpController<M, NM, I, C> {
  protected repo;

  constructor(repo: Repository<M, NM, I, C>) {
    this.repo = repo;
  }

  public abstract add(data: unknown): Promise<Result<unknown, JsonError[]>>;

  public abstract update(data: unknown): Promise<Result<unknown, JsonError[]>>;

  public abstract get(
    id?: unknown,
  ): Promise<Result<unknown | undefined | null, JsonError[]>>;

  public abstract delete(id?: unknown): Promise<Result<unknown, JsonError[]>>;

  public abstract getBy(
    criteria: unknown,
  ): Promise<Result<Search<unknown, unknown>, JsonError[]>>;
}
