import { z } from "zod";
import { MIN_AGE } from "../../config.js";
import HttpController from "./http.controller.js";
import { handleZodError } from "../handler/zod.handler.js";
import { SearchMode } from "../../domain/value_objects/string.criteria.js";
import JsonResponse from "../../domain/exceptions/json.response.js";
import { clienteToJson } from "../parser/cliente.json.js";
const nombreSimpleRegex = /^(?!.*\s\s)[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:[ -][A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
const nombreCompuestoRegex = /^(?!.*\s{2})(?!.*[0-9_!"#$%&'()*+,./:;<=>?@[\\\]^{|}~])[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:[ -](?:(?:(?:del|de la|de los|de las|de|las|los|y|a|e)[ -])?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+))+$/;
const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/;
const pwdErrorMessage = [
    "Mínimo 8 caracteres",
    "Al menos una mayúscula",
    "Al menos una minúscula",
    "Al menos un número",
    "Al menos un carácter especial (@$!%*?&._)",
].join(", ");
const isoUTCRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
const localDateRegex = /^\d{4}-\d{2}-\d{2}$/;
const NewClientSchema = z.object({
    nombres: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres.")
        .refine((nombre) => nombreSimpleRegex.test(nombre) || nombreCompuestoRegex.test(nombre), {
        message: "El nombre debe ser simple o compuesto. Por ejemplo, un nombre simple debe comenzar con mayúscula seguida de minúsculas sin espacios dobles, mientras que un nombre compuesto puede incluir separadores (espacios o guiones) y palabras como 'del', 'de la', etc. seguido obligatoriamente de otro nombre",
    }),
    apellido_paterno: z
        .string()
        .min(3, "El apellido paterno debe tener al menos 3 caracteres.")
        .regex(nombreSimpleRegex, "El apellido paterno debe ser simple: debe comenzar con mayúscula seguida de minúsculas y no puede incluir caracteres especiales ni espacios dobles."),
    apellido_materno: z
        .string()
        .min(3, "El apellido materno debe tener al menos 3 caracteres.")
        .regex(nombreSimpleRegex, "El apellido materno debe ser simple: debe iniciar con mayúscula seguida de minúsculas y sin caracteres especiales ni espacios dobles.")
        .optional()
        .or(z.literal("")),
    fecha_nacimiento: z.preprocess((arg) => {
        if (typeof arg === "string") {
            // Si la cadena coincide con alguno de los formatos, se retorna el Date correspondiente.
            if (isoUTCRegex.test(arg) || localDateRegex.test(arg)) {
                return new Date(arg);
            }
            // En caso contrario, retornamos un Date inválido.
            return new Date("");
        }
        // Si ya es un Date o un número, lo retornamos tal cual.
        return arg;
    }, 
    // Se valida que el valor sea un Date válido y se transforma para comparar solo la parte de la fecha.
    z
        .date()
        .refine((date) => !isNaN(date.getTime()), {
        message: "La fecha debe estar en formato local (YYYY-MM-DD) o UTC (ISO 8601). Ejemplos válidos: 2025-03-24 o 2025-03-24T12:34:56.789Z",
    })
        .transform((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()))
        .refine((date) => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaMinima = new Date(hoy.getFullYear() - MIN_AGE, hoy.getMonth(), hoy.getDate());
        return date <= fechaMinima;
    }, {
        message: `La fecha de nacimiento indica que el cliente no cumple la edad mínima requerida de ${MIN_AGE} años.`,
    })),
    email: z
        .string()
        .min(1, "El email es obligatorio.")
        .email("El formato del email es inválido. Ejemplo válido: usuario@dominio.com."),
    password: z.string().regex(pwdRegex, pwdErrorMessage),
});
const ClienteSchema = NewClientSchema.extend({
    id: z
        .number()
        .int("El ID debe ser un número entero")
        .positive("El ID debe ser un número positivo"),
});
const CriteriaSchema = z.object({
    nombres: z
        .string()
        .min(3, "Búsqueda por nombre debe tener al menos 3 caracteres")
        .optional(),
    apellidoP: z
        .string()
        .min(3, "Búsqueda por apellido paterno debe tener al menos 3 caracteres")
        .optional(),
    apellidoM: z
        .string()
        .min(3, "Búsqueda por apellido materno debe tener al menos 3 caracteres")
        .optional(),
    fechaNacimiento: z.coerce.date().optional(),
    email: z.string().email("Formato de email inválido para búsqueda").optional(),
    page: z.coerce
        .number()
        .int("El número de página debe ser entero")
        .positive("El número de página debe ser positivo")
        .default(1),
});
export default class ClienteController extends HttpController {
    parseClient({ apellidoP, apellidoM, fechaNacimiento, fechaCreacion, ...restClient }) {
        return {
            ...restClient,
            apellido_paterno: apellidoP,
            apellido_materno: apellidoM,
            fecha_nacimiento: fechaNacimiento,
            fecha_creacion: fechaCreacion,
        };
    }
    async repetatedEmail(email) {
        const searchEmail = await this.repo.getBy({
            email: {
                mode: SearchMode.EQUALS,
                str: email,
            },
        }, 1);
        if (searchEmail.result.length !== 0) {
            throw new JsonResponse([
                {
                    field: "email",
                    message: "Ya se ha registrado el email",
                },
            ]);
        }
    }
    async add(d) {
        const validation = NewClientSchema.safeParse(d);
        if (!validation.success)
            handleZodError(validation.error);
        const data = validation.data;
        await this.repetatedEmail(data.email);
        const newC = await this.repo.add({
            nombres: data.nombres,
            apellidoP: data.apellido_paterno,
            apellidoM: data.apellido_materno,
            email: data.email,
            password: data.password,
            fechaNacimiento: data.fecha_nacimiento,
        });
        return clienteToJson(newC);
    }
    async update(d) {
        const validation = ClienteSchema.safeParse(d);
        if (!validation.success)
            handleZodError(validation.error);
        const data = validation.data;
        await this.repetatedEmail(data.email);
        const updated = await this.repo.update({
            id: data.id,
            nombres: data.nombres,
            apellidoP: data.apellido_paterno,
            apellidoM: data.apellido_materno,
            email: data.email,
            password: data.password,
            fechaNacimiento: data.fecha_nacimiento,
            fechaCreacion: data.fecha_creacion,
        });
        return clienteToJson(updated);
    }
    async delete(id) {
        this.validateId(id);
        const deleted = await this.repo.delete(Number(id));
        return clienteToJson(deleted);
    }
    async get(id) {
        const result = z.coerce.number().int().positive().safeParse(id);
        if (!result.success)
            handleZodError(result.error);
        console.log(`ID dado: ${id}`);
        const seek = await this.repo.get(Number(id));
        return seek ? clienteToJson(seek) : undefined;
    }
    async getBy(query) {
        const result = CriteriaSchema.safeParse(query);
        if (!result.success)
            handleZodError(result.error);
        if (!result.data)
            throw new Error();
        const { nombres, apellidoM, apellidoP, email, page, fechaNacimiento } = result.data;
        const search = await this.repo.getBy({
            nombres: nombres
                ? {
                    mode: SearchMode.LIKE,
                    str: nombres,
                }
                : undefined,
            apellidoP: apellidoP
                ? {
                    mode: SearchMode.LIKE,
                    str: apellidoP,
                }
                : undefined,
            apellidoM: apellidoM
                ? {
                    mode: SearchMode.LIKE,
                    str: apellidoM,
                }
                : undefined,
            email: email
                ? {
                    mode: SearchMode.LIKE,
                    str: email,
                }
                : undefined,
            fechaNacimiento,
        }, page);
        return {
            ...search,
            result: search.result.map(clienteToJson),
        };
    }
}
