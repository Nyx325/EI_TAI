import { Cliente } from "../entity/cliente.js";

export function clienteToJson(data: Cliente): unknown {
  const {
    apellidoP,
    apellidoM,
    fechaCreacion,
    fechaNacimiento,
    ...restData
  } = data;

  return {
    ...restData,
    apellido_paterno: apellidoP,
    apellido_materno: apellidoM,
    fecha_creacion: fechaCreacion,
    fecha_nacimiento: fechaNacimiento,
  };
}
