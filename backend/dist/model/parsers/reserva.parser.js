import { alojamientoToJson } from "./alojamiento.parser.js";
import { clienteToJson } from "./cliente.parser.js";
export function reservaToJsonFull(r) {
    const { alojamientoId, clienteId, Cliente, Alojamiento, ...restR } = r;
    return {
        ...restR,
        alojamiento_id: alojamientoId,
        cliente_id: clienteId,
        cliente: Cliente ? clienteToJson(Cliente) : undefined,
        alojamiento: Alojamiento ? alojamientoToJson(Alojamiento) : undefined,
    };
}
export function reservaToJson(r) {
    const { alojamientoId, clienteId, Cliente, Alojamiento, ...restR } = r;
    return {
        ...restR,
        alojamiento_id: alojamientoId,
        cliente_id: clienteId,
    };
}
