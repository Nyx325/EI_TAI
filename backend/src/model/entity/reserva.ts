import { Alojamiento } from "./alojamiento.js";
import { Cliente } from "./cliente.js";

export interface Reserva {
  id: number;
  inicio: Date;
  fin: Date;
  total: number;
  clienteId: number;
  alojamientoId: number;

  Cliente?: Cliente;
  Alojamiento?: Alojamiento;
}

export interface NewReserva {
  inicio: Date;
  fin: Date;
  total: number;
  clienteId: number;
  alojamientoId: number;
}

export interface ReservaCriteria {
  inicio?: Date;
  fin?: Date;
  total?: number;
  clienteId?: number;
  alojamientoId?: number;
}
