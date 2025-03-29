import { hash, compare } from "bcrypt";
import { Err, Ok, Result } from "neverthrow";
import z from "zod";

import { SALT_ROUNDS } from "../config.js";
import {
  Cliente,
  ClienteCriteria,
  ClienteNuevo,
} from "../model/entity/cliente.js";
import { clienteToJson } from "../model/parsers/cliente.parser.js";
import { extractErrors } from "../model/parsers/zod.parser.js";
import Repository from "../model/repository/repository.js";
import JsonError from "../model/value_object/json.error.js";
import { SearchMode } from "../model/value_object/searchable.string.js";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, SALT_ROUNDS);
  return hashedPassword;
}

export async function verifyPassword(
  inputPassword: string,
  storedHash: string,
) {
  const match = await compare(inputPassword, storedHash);
  return match; // true si coincide, false si no
}

export class AuthController {
  protected parseJson: (c: Cliente) => unknown = (c) => c;
  protected repo;
  protected dataSchema = z.object({
    email: z.coerce.string({ required_error: "El email es necesario" }),
    password: z.coerce.string({ required_error: "La contraseña es necesaria" }),
  });

  constructor(
    repo: Repository<Cliente, ClienteNuevo, number, ClienteCriteria>,
  ) {
    this.repo = repo;
    this.parseJson = clienteToJson;
  }

  async login(data: unknown): Promise<Result<Cliente, JsonError[]>> {
    const validation = this.dataSchema.safeParse(data);
    if (!validation.success) {
      const errors = extractErrors(validation.error);
      return new Err(errors);
    }

    const { email, password } = validation.data;
    const busqueda = await this.repo.getBy(
      {
        email: {
          mode: SearchMode.EQUALS,
          str: email,
        },
      },
      1,
    );

    if (busqueda.result.length === 0) {
      return new Err([
        {
          field: "email",
          message: "Email no encontrado",
        },
      ]);
    }

    const cliente = busqueda.result[0];
    if ((await verifyPassword(password, cliente.password)) === false) {
      return new Err([
        {
          field: "password",
          message: "Contraseña incorrecta",
        },
      ]);
    }

    return new Ok(cliente);
  }
}
