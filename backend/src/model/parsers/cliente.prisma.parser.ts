import { Cliente as PrismaCliente } from "@prisma/client";
import { Cliente } from "../entity/cliente.js";

export function toCliente(
  pc: PrismaCliente,
): Cliente {
  return pc;
}

export function fromCliente(c: Cliente): PrismaCliente {
  const {apellidoM, ...restC} = c;
  return {
    apellidoM: apellidoM ? apellidoM : null,
    ...restC
  };
}
