import { z } from "zod"
import { MIN_AGE } from "../config.js";
import HttpController from "./http.controller.js";
import { Cliente, ClienteCriteria, ClienteCriteriaQuery, ClienteJson, ClienteNuevo } from "../domain/entities/cliente.js";
import Search from "../domain/value_objects/search.js";
import { handleZodError } from "./zod.handler.js";
import { SearchMode } from "../domain/value_objects/string.criteria.js";
import { clienteToJson } from "./cliente.json.js";

const nameRegex = /^(?!.*\s\s)[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:[ -][A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/i;
const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const NewClientSchema = z.object({
  nombres: z.string()
    .min(3, "Debe tener al menos 3 caracteres")
    .regex(nameRegex),
  apellidoP: z.string()
    .min(3, "Debe tener al menos 3 caracteres")
    .regex(nameRegex),
  apellidoM: z.string()
    .min(3, "Debe tener al menos 3 caracteres")
    .regex(nameRegex)
    .optional(),
  fechaNacimiento: z.coerce.date()
    .refine((date) => {
      const hoyUTC = new Date(Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate()
      ));

      const fechaMinimaUTC = new Date(Date.UTC(
        hoyUTC.getUTCFullYear() - MIN_AGE,
        hoyUTC.getUTCMonth(),
        hoyUTC.getUTCDate()
      ));

      return date <= fechaMinimaUTC;
    }, `Se debe tener una edad mayor a ${MIN_AGE}`),
  email: z.string().min(1, "no puede estar vacío").email(),
  password: z.string()
    .regex(pwdRegex),
});

const ClienteSchema = NewClientSchema.extend({
  id: z.number()
    .int()
    .positive("ID inválido"),
});

const CriteriaSchema = z.object({
  nombres: z.string().optional(),
  apellidoP: z.string().optional(),
  apellidoM: z.string().optional(),
  fechaNacimiento: z.coerce.date().optional(),
  email: z.string().email(),
  page: z.coerce.number().int().positive().default(1),
})

export default class ClienteController extends HttpController<
  ClienteJson,
  ClienteCriteriaQuery,
  Cliente,
  ClienteNuevo,
  number,
  ClienteCriteria
> {

  public add(d: ClienteJson): Promise<ClienteJson> {
    const validation = NewClientSchema.safeParse(d);
    if (!validation.success) handleZodError(validation.error)

    const data = validation.data as ClienteNuevo;
    return this.repo.add(data)
  }
  public update(d: ClienteJson): Promise<ClienteJson> {
    const validation = ClienteSchema.safeParse(d);
    if (!validation.success) handleZodError(validation.error)

    const data = validation.data as Cliente;
    return this.repo.update(data);
  }
  public async delete(id: unknown): Promise<ClienteJson> {
        this.validateId(id);
        const deleted = await this.repo.delete(Number(id));
        return clienteToJson(deleted);
  }
  public get(id: unknown): Promise<ClienteJson | null | undefined> {
    const result = z.number().int().positive().safeParse(id);
    if (!result.success) handleZodError(result.error);

    return this.repo.get(id as number);
  }
  public async getBy(query: ClienteCriteriaQuery): Promise<Search<ClienteJson, ClienteCriteria>> {
    const result = CriteriaSchema.safeParse(query);
    if (!result.success) handleZodError(result.error);
    if (!result.data) throw new Error();

    const {
      nombres,
      apellidoM,
      apellidoP,
      email,
      page,
      fechaNacimiento,
    } = result.data;

    const search = await this.repo.getBy({
      nombres: nombres ? {
        mode: SearchMode.LIKE,
        str: nombres
      } : undefined,
      apellidoP: apellidoP ? {
        mode: SearchMode.LIKE,
        str: apellidoP
      } : undefined,
      apellidoM: apellidoM ? {
        mode: SearchMode.LIKE,
        str: apellidoM
      } : undefined,
      email: email ? {
        mode: SearchMode.LIKE,
        str: email,
      } : undefined,
      fechaNacimiento,
    }, page);

    return {
      ...search,
      result: search.result.map(clienteToJson),
    }
  }

}
