import { Err, Ok, Result } from "ts-results";
import { ApiErrorResponse } from "../models/value_objects/api.responses";

export async function handleErrorResponse(
  response: Response,
): Promise<Result<undefined, ApiErrorResponse>> {
  if (response.status >= 400 && response.status < 500) {
    const error = (await response.json()) as ApiErrorResponse;
    return Err(error);
  } else if (response.status >= 500) {
    throw new Error("Internal server error");
  }

  return Ok(undefined);
}

function convertValue(value: any): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") return JSON.stringify(value);
  return value.toString();
}

export function objectToQueryString(params: Record<string, any>): string {
  const queryItems: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        queryItems.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(convertValue(item))}`,
        );
      });
    } else if (value instanceof Date) {
      queryItems.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value.toISOString())}`,
      );
    } else if (typeof value === "object") {
      // Para objetos anidados (serialización JSON opcional)
      queryItems.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`,
      );
    } else {
      queryItems.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`,
      );
    }
  }

  return queryItems.join("&");
}
