import { Ok } from "ts-results";
import { API_URL } from "../config";
import { Controller } from "./controller";
import {
  ApiRecordResponse,
  ApiRecordsResponse,
} from "../models/value_objects/api.responses";
import {
  handleErrorResponse,
  objectToQueryString,
} from "../handlers/http.handler";
import {
  Cliente,
  ClienteNuevo,
  ClienteCriteria,
} from "../models/entities/cliente";

const ENDPOINT = `${API_URL}/cliente`;

async function handleResponse(response: Response) {
  const validation = await handleErrorResponse(response);
  if (validation.err) return validation;

  const { registro } = (await response.json()) as ApiRecordResponse<Cliente>;
  return Ok(registro);
}

const alojamientoHttpController: Controller<
  Cliente,
  ClienteNuevo,
  ClienteCriteria,
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
      Cliente,
      ClienteCriteria
    >;
    return Ok(search);
  },
};

export default alojamientoHttpController;
