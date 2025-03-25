export interface Reserva{
  id: number;
  inicio: Date;
  fin: Date;
  total: number;
  clienteId: number;
  alojamientoId: number;
}

export interface Reserva{
  inicio: Date;
  fin: Date;
  total: number;
  cienteId: number;
  alojamientoId: number;
}

export interface ReservaCriteria {
  inicio?: Date;
  fin?: Date;
  total?: number;
  cienteId?: number;
  alojamientoId?: number;
}

export interface ReservaJson {
  id?: unknown;
  inicio?: unknown;
  fin?: unknown;
  total?: unknown;
  ciente_id?: unknown;
  alojamiento_id?: unknown;
}

export interface ReservaCriteriaQuery {
  inicio?: unknown;
  fin?: unknown;
  total?: unknown;
  cienteId?: unknown;
  alojamientoId?: unknown;
}
