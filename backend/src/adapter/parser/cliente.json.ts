import {Cliente, ClienteJson} from "../../domain/entities/cliente.js";

export const clienteToJson = (c: Cliente): ClienteJson => {
  const {
    apellidoP,
    apellidoM,
    fechaCreacion,
    fechaNacimiento,
    ...restC
  } = c;

  return {
    ...restC,
    apellido_paterno: apellidoP,
    apellido_materno: apellidoM,
    fecha_creacion: fechaCreacion,
    fecha_nacimiento: fechaNacimiento,
  }
}
