import { Decimal } from "@prisma/client/runtime/client";
import { fromAlojamiento, toAlojamiento } from "./alojamiento.prisma.parser.js";
import { fromCliente, toCliente } from "./cliente.prisma.parser.js";
export function fromReserva(r) {
    const { total, Alojamiento, Cliente, ...restR } = r;
    return {
        total: new Decimal(total),
        Cliente: Cliente ? fromCliente(Cliente) : undefined,
        Alojamiento: Alojamiento ? fromAlojamiento(Alojamiento) : undefined,
        ...restR,
    };
}
export function fromNewReserva(nr) {
    const { total, ...restR } = nr;
    return {
        total: new Decimal(total),
        ...restR,
    };
}
export function toReserva(pr) {
    const { total, Cliente, Alojamiento, ...restPR } = pr;
    return {
        total: total.toNumber(),
        Cliente: Cliente ? toCliente(Cliente) : undefined,
        Alojamiento: Alojamiento ? toAlojamiento(Alojamiento) : undefined,
        ...restPR,
    };
}
