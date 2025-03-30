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
export function toTipoCliente(t) {
    return matchFromPrisma[t];
}
export function fromTipoCliente(t) {
    return matchToPrisma[t];
}
export function toCliente(pc) {
    const { tipo, ...restPc } = pc;
    return {
        ...restPc,
        tipo: toTipoCliente(tipo),
    };
}
export function fromCliente(c) {
    const { apellidoM, tipo, ...restC } = c;
    return {
        ...restC,
        apellidoM: apellidoM ? apellidoM : null,
        tipo: fromTipoCliente(tipo),
    };
}
