import { z } from "zod";
import JsonError from "../value_object/json.error.js";

export function extractErrors(error: z.ZodError): JsonError[] {
  return error.errors.map((err) => ({
    field: err.path[0] || "general",
    message: err.message,
  }));
}
