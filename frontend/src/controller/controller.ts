import { Result, Ok, Err } from "ts-results";
import { objectToQueryString } from "../handlers/http.handler";
import {
  ApiErrorResponse,
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
interface ControllerFactoryConfig<T, C, K> {
  endpoint: string;
}

export function createHttpController<T, NewT, CriteriaT, IdT>(
  config: ControllerFactoryConfig<T, CriteriaT, IdT>,
): Controller<T, NewT, CriteriaT, IdT> {
  const { endpoint } = config;

  async function handleResponse(response: Response): Promise<Result<T | null>> {
    if (response.status === 404) return Ok(null);

    const validation = await handleErrorResponse(response);
    if (validation.err) return validation;

    const { registro } = (await response.json()) as ApiRecordResponse<T>;
    return Ok(registro);
  }

  async function handleSearchResponse(
    response: Response,
  ): Promise<Result<SearchResult<T>>> {
    const validation = await handleErrorResponse(response);
    if (validation.err) return validation;

    const { search } = (await response.json()) as ApiRecordsResponse<
      T,
      CriteriaT
    >;
    return Ok(search);
  }

  return {
    async add(data: NewT) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
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
      return handleResponse(response);
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

// Uso para Alojamiento
export const alojamientoHttpController = createHttpController<
  Alojamiento,
  NewAlojamiento,
  AlojamientoCriteria,
  number
>({
  endpoint: `${API_URL}/alojamiento`,
});

// Uso para Cliente
export const clienteHttpController = createHttpController<
  Cliente,
  ClienteNuevo,
  ClienteCriteria,
  number
>({
  endpoint: `${API_URL}/cliente`,
});
