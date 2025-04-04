import HttpController from "./http.controller.js";
import { z } from "zod";
import { MIN_AGE } from "../config.js";
import { extractErrors } from "../model/parsers/zod.parser.js";
import { SearchMode } from "../model/value_object/searchable.string.js";
import { Err, Ok } from "neverthrow";
import { clienteToJson } from "../model/parsers/cliente.parser.js";
import { hashPassword } from "./auth.controller.js";
const nombreSimpleRegex = /^(?!.*\s\s)[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:[ -][A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
const nombreCompuestoRegex = /^(?!.*\s{2})(?!.*[0-9_!"#$%&'()*+,./:;<=>?@[\\\]^{|}~])[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:[ -](?:(?:(?:del|de la|de los|de las|de|las|los|y|a|e)[ -])?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+))+$/;
const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/;
const isoUTCRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
const localDateRegex = /^\d{4}-\d{2}-\d{2}$/;
export default class ClienteController extends HttpController {
    constructor(repo) {
        super(repo);
        this.parseJson = clienteToJson;
    }
    async add(data) {
        const result = await this.newSchema.safeParseAsync(data);
        if (!result.success) {
            const errors = extractErrors(result.error);
            return new Err(errors);
        }
        const { apellido_paterno, apellido_materno, fecha_nacimiento, password, ...restData } = result.data;
        const newRecord = await this.repo.add({
            apellidoP: apellido_paterno,
            apellidoM: apellido_materno,
            fechaNacimiento: fecha_nacimiento,
            password: await hashPassword(password),
            ...restData,
        });
        return new Ok(this.parseJson(newRecord));
    }
    async update(data) {
        const result = await this.updateSchema.safeParseAsync(data);
        if (!result.success) {
            const errors = extractErrors(result.error);
            return new Err(errors);
        }
        const c = (await this.repo.get(result.data.id));
        const { apellido_paterno, apellido_materno, fecha_nacimiento, password, ...restData } = result.data;
        const newRecord = await this.repo.update({
            apellidoP: apellido_paterno,
            apellidoM: apellido_materno,
            fechaNacimiento: fecha_nacimiento,
            fechaCreacion: c.fechaCreacion,
            password: password ? await hashPassword(password) : c.password,
            ...restData,
        });
        return new Ok(this.parseJson(newRecord));
    }
    async getBy(criteria) {
        const validation = this.criteriaSchema.safeParse(criteria);
        if (!validation.success) {
            return new Err(extractErrors(validation.error));
        }
        const { page, nombres, email, apellidoP, apellidoM, ...c } = validation.data;
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
            ...c,
        }, page);
        const { result, ...s } = search;
        return new Ok({
            ...s,
            result: result.map(this.parseJson),
        });
    }
    /** VALIDATION ZOD SCHEMAS */
    newSchema = z.object({
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
            .email("El formato del email es inválido. Ejemplo válido: usuario@dominio.com.")
            .refine(async (email) => {
            const search = await this.repo.getBy({
                email: {
                    mode: SearchMode.EQUALS,
                    str: email,
                },
            }, 1);
            return search.result.length === 0;
        }, "Email ya registrado"),
        password: z
            .string()
            .regex(pwdRegex, [
            "Mínimo 8 caracteres",
            "Al menos una mayúscula",
            "Al menos una minúscula",
            "Al menos un número",
            "Al menos un carácter especial (@$!%*?&._)",
        ].join(", ")),
        tipo: z.coerce
            .number()
            .int("Debe ser un valor entre 0 y 1")
            .min(0, "Debe ser un valor entre 0 y 1")
            .max(1, "Debe ser un valor entre 0 y 1")
            .optional()
            .default(0),
    });
    updateSchema = this.newSchema
        // En update, es probable que quieras redefinir la validación del email para diferenciar
        // el caso en que se cambia el email:
        .extend({
        email: z
            .string()
            .min(1, "El email es obligatorio.")
            .email("El formato del email es inválido. Ejemplo válido: usuario@dominio.com."),
        password: z
            .string()
            .regex(pwdRegex, [
            "Mínimo 8 caracteres",
            "Al menos una mayúscula",
            "Al menos una minúscula",
            "Al menos un número",
            "Al menos un carácter especial (@$!%*?&._)",
        ].join(", "))
            .optional(),
    })
        // Combina el esquema de datos con el esquema del ID
        .merge(this.intExistsSchema)
        // Validación extra para el email que se quiere actualizar, verificando que no exista ya otro registro
        .superRefine(async (data, ctx) => {
        const search = await this.repo.getBy({
            email: {
                mode: SearchMode.EQUALS,
                str: data.email,
            },
        }, 1);
        const result = search.result;
        if (result.length !== 0 && result[0].id !== data.id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Email ya registrado",
                path: ["email"],
            });
        }
    });
    criteriaSchema = z.object({
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
        email: z.string().optional(),
        page: z.coerce
            .number()
            .int("El número de página debe ser entero")
            .positive("El número de página debe ser positivo")
            .default(1),
    });
}
