import { Ok } from "ts-results";
import { API_URL } from "../config";
import {
  handleErrorResponse,
  objectToQueryString,
} from "../handlers/http.handler";
import { Controller } from "./controller";
import {
  Alojamiento,
  AlojamientoCriteria,
  NewAlojamiento,
} from "../models/entities/alojamiento";
import {
  ApiRecordResponse,
  ApiRecordsResponse,
} from "../models/value_objects/api.responses";

const ENDPOINT = `${API_URL}/alojamiento`;

async function handleResponse(response: Response) {
  const validation = await handleErrorResponse(response);
  if (validation.err) return validation;

  const { registro } =
    (await response.json()) as ApiRecordResponse<Alojamiento>;
  return Ok(registro);
}

const alojamientoHttpController: Controller<
  Alojamiento,
  NewAlojamiento,
  AlojamientoCriteria,
  number
> = {
  async add(data) {
    const response = await fetch(`${ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async update(data) {
    const response = await fetch(`${ENDPOINT}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async delete(id) {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    return handleResponse(response);
  },

  async get(id) {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "GET",
    });

    if (response.status === 404) {
      return Ok(null);
    }

    return handleResponse(response);
  },

  async getBy(criteria, page) {
    const response = await fetch(
      `${ENDPOINT}?page=${page}&${objectToQueryString(criteria)}`,
      {
        method: "GET",
      },
    );

    if (response.status === 404) {
      return Ok(null);
    }

    const validation = await handleErrorResponse(response);
    if (validation.err) return validation;

    const { search } = (await response.json()) as ApiRecordsResponse<
      Alojamiento,
      AlojamientoCriteria
    >;
    return Ok(search);
  },
};

export default alojamientoHttpController;
