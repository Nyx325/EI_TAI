import { Cliente as PrismaCliente } from "@prisma/client";
import { Cliente } from "../entity/cliente.js";

import { TipoCliente as PrismaTipoCliente } from "@prisma/client";
import { TipoCliente } from "../entity/cliente.js";

const matchToPrisma = {
  [TipoCliente.USER]: PrismaTipoCliente.USER,
  [TipoCliente.ADMIN]: PrismaTipoCliente.ADMIN,
};

const matchFromPrisma = {
  [PrismaTipoCliente.USER]: TipoCliente.USER,
  [PrismaTipoCliente.ADMIN]: TipoCliente.ADMIN,
};

export function toTipoCliente(t: PrismaTipoCliente) {
  return matchFromPrisma[t];
}

export function fromTipoCliente(t: TipoCliente) {
  return matchToPrisma[t];
}

export function toCliente(pc: PrismaCliente): Cliente {
  const { tipo, ...restPc } = pc;
  return {
    ...restPc,
    tipo: toTipoCliente(tipo),
  };
}

export function fromCliente(c: Cliente): PrismaCliente {
  const { apellidoM, tipo, ...restC } = c;
  return {
    ...restC,
    apellidoM: apellidoM ? apellidoM : null,
    tipo: fromTipoCliente(tipo),
  };
}
