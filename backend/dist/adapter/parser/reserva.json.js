export const reservaToJson = (reserva) => {
    const { clienteId, alojamientoId, ...restReserva } = reserva;
    return {
        ciente_id: clienteId,
        alojamiento_id: alojamientoId,
        ...restReserva
    };
};
