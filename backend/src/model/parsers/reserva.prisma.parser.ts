import { Decimal } from "@prisma/client/runtime/client";
import { NewReserva, Reserva } from "../entity/reserva.js";
import { Prisma } from "@prisma/client";
import { fromAlojamiento, toAlojamiento } from "./alojamiento.prisma.parser.js";
import { fromCliente, toCliente } from "./cliente.prisma.parser.js";

// Obtener el tipo del usuario con posts incluidos
type ReservaWithForeignData = Prisma.ReservaGetPayload<{ include: { Cliente: true, Alojamiento: true } }>

// Hacer solo las relaciones opcionales
type PrismaReserva = Omit<ReservaWithForeignData, 'Cliente' | 'Alojamiento'> & Partial<{
  Cliente?: ReservaWithForeignData['Cliente'],
  Alojamiento?: ReservaWithForeignData['Alojamiento'],
}>

export function fromReserva(r: Reserva): PrismaReserva {
  const {total, Alojamiento,Cliente, ...restR} = r;
  return {
    total: new Decimal(total),
    Cliente: Cliente ? fromCliente(Cliente) : undefined,
    Alojamiento: Alojamiento ? fromAlojamiento(Alojamiento) : undefined,
    ...restR
  }
}

export function fromNewReserva(nr: NewReserva): Omit<PrismaReserva, "id"> {
  const {total, ...restR} = nr;
  return {
    total: new Decimal(total),
    ...restR
  }
}

export function toReserva(pr: PrismaReserva): Reserva {
  const { total, Cliente, Alojamiento, ...restPR } = pr;
  return {
    total: total.toNumber(),
    Cliente: Cliente ? toCliente(Cliente) : undefined,
    Alojamiento: Alojamiento ? toAlojamiento(Alojamiento) : undefined,
    ...restPR
  }
}
