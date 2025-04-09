import { Result, Ok, Err } from "ts-results";
import { API_URL } from "../config";
import { objectToQueryString } from "../handlers/http.handler";
import {
  ApiErrorResponse,
  ApiErrorType,
  ApiRecordResponse,
  ApiRecordsResponse,
} from "../models/value_objects/api.responses";
import Search from "../models/value_objects/search";

export interface Seeker<M, C, I> {
  get(id: I): Promise<Result<M | null, ApiErrorResponse>>;
  getBy(
    criteria: C,
    page: number,
  ): Promise<Result<Search<M, C> | null, ApiErrorResponse>>;
}

export interface Controller<M, NM, C, I> extends Seeker<M, C, I> {
  add(data: NM): Promise<Result<M, ApiErrorResponse>>;
  update(data: M): Promise<Result<M, ApiErrorResponse>>;
  delete(data: I): Promise<Result<M, ApiErrorResponse>>;
}

// http-controller-factory.ts
export interface ControllerFactoryConfig<T, C, K> {
  endpoint: string;
}

export async function handleErrorResponse(
  response: Response,
): Promise<Result<null, ApiErrorResponse>> {
  if (response.status >= 400 && response.status < 500) {
    let parsed = {} as { message: string; errs?: any[] };
    try {
      // Verificamos si el response tiene contenido
      const text = await response.text();
      parsed = text ? JSON.parse(text) : { message: "Error del cliente" };
    } catch (error) {
      parsed = { message: "Error al parsear respuesta del cliente" };
    }
    return Err({
      type: ApiErrorType.BadRequest,
      message: parsed.message,
      errors: parsed.errs || [],
    });
  } else if (response.status >= 500) {
    return Err({
      type: ApiErrorType.Internal,
      message: "Internal server error",
      errors: [],
    });
  }

  return Ok(null);
}

export async function handleResponse<T>(
  response: Response,
): Promise<Result<T, ApiErrorResponse>> {
  const validation = await handleErrorResponse(response);
  if (validation.err) return validation;

  const { registro } = (await response.json()) as ApiRecordResponse<T>;
  return Ok(registro);
}

export async function handleOptionalRecordResponse<T>(
  response: Response,
): Promise<Result<T | null, ApiErrorResponse>> {
  if (response.status === 404) return Ok(null);
  return handleResponse(response);
}

export function createHttpController<T, NewT, CriteriaT, IdT>(
  config: ControllerFactoryConfig<T, CriteriaT, IdT>,
): Controller<T, NewT, CriteriaT, IdT> {
  const endpoint = `${API_URL}/${config.endpoint}`;

  async function handleSearchResponse(
    response: Response,
  ): Promise<Result<Search<T, CriteriaT> | null, ApiErrorResponse>> {
    if (response.status === 404) return Ok(null);

    const validation = await handleErrorResponse(response);
    if (validation.err) return validation;

    const data = await response.json();
    return Ok(data.search);
  }

  return {
    async add(data: NewT) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse<T>(response);
    },

    async update(data: T) {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    async delete(id: IdT) {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });
      return handleResponse(response);
    },

    async get(id: IdT) {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "GET",
      });
      return handleOptionalRecordResponse(response);
    },

    async getBy(criteria: CriteriaT, page: number) {
      const query = objectToQueryString({
        ...criteria,
        page,
      });

      const response = await fetch(`${endpoint}?${query}`, {
        method: "GET",
      });

      return handleSearchResponse(response);
    },
  };
}
