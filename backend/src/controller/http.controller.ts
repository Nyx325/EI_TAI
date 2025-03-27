import { Err, Ok, Result } from "neverthrow";
import JsonError from "../model/value_object/json.error.js";
import Repository from "../model/repository/repository.js";
import Search from "../model/value_object/search.js";
import { z } from "zod";
import { extractErrors } from "../model/parsers/zod.parser.js";

export default abstract class HttpController<M, NM, I, C> {
  protected repo;
  protected parseJson: (m: M) => unknown = (m) => m;

  constructor(repo: Repository<M, NM, I, C>) {
    this.repo = repo;
  }

  public abstract getBy(
    criteria: unknown,
  ): Promise<Result<Search<unknown, unknown>, JsonError[]>>;

  public async get(
    id?: unknown,
  ): Promise<Result<unknown | undefined | null, JsonError[]>> {
    const result = this.intIdSchema.safeParse({ id });
    if (!result.success) {
      return new Err(extractErrors(result.error));
    }

    const record = await this.repo.get(result.data.id as I);
    const response = record ? this.parseJson(record) : undefined;
    return new Ok(response);
  }

  public async delete(id?: unknown): Promise<Result<unknown, JsonError[]>> {
    const result = await this.intExistsSchema.safeParseAsync({ id });
    if (!result.success) {
      return new Err(extractErrors(result.error));
    }

    const deleted = await this.repo.delete(result.data.id as I);
    return new Ok(this.parseJson(deleted));
  }

  public abstract add(data: unknown): Promise<Result<unknown, JsonError[]>>;

  public abstract update(data: unknown): Promise<Result<unknown, JsonError[]>>;

  /** ZOD VALIDATION SCHEMAS */
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
