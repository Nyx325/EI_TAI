
import {z} from "zod"
import JsonResponse from "../../domain/exceptions/json.response.js";

export const handleZodError = (error: z.ZodError) => {
    const errors = error.errors.map((err) => ({
      field: err.path[0] || "general",
      message: err.message,
    }));
    throw new JsonResponse(errors);
}
