export interface Reserva {
  id: number;
  inicio: Date;
  fin: Date;
  total: number;
  cliente_id: number;
  alojamiento_id: number;
}

export interface NewReserva {
  inicio: Date;
  fin: Date;
  total: number;
  cliente_id: number;
  alojamiento_id: number;
}

export interface ReservaCriteria {
  inicio?: Date;
  fin?: Date;
  total?: number;
  clienteId?: number;
  alojamientoId?: number;
}
