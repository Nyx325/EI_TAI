import { Reserva, ReservaJson } from "../../domain/entities/reserva.js";

export const reservaToJson = (reserva: Reserva):ReservaJson => {
  const {
    clienteId,
    alojamientoId,
    ...restReserva
  } = reserva;

  return {
    ciente_id: clienteId,
    alojamiento_id: alojamientoId,
    ...restReserva
  }
}
