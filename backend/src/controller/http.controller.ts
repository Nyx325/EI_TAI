import { Result } from "neverthrow";
import JsonError from "../model/value_object/json.error.js";
import Repository from "../model/repository/repository.js";
import Search from "../model/value_object/search.js";
import { z } from "zod";

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

  protected intIdSchema = z.object({
    id: z.coerce
      .number()
      .int("El ID debe ser un número entero")
      .positive("El ID debe ser un número positivo"),
  });

  protected intExistsSchema = z.object({
    id: z.coerce
      .number()
      .int("El ID debe ser un número entero")
      .positive("El ID debe ser un número positivo")
      .refine(
        async (id) => await this.repo.get(id as I),
        "No se encontró el registro",
      ),
  });
}
