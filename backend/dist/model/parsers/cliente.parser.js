export function clienteToJson(data) {
    const { password, apellidoP, apellidoM, fechaCreacion, fechaNacimiento, ...restData } = data;
    return {
        ...restData,
        apellido_paterno: apellidoP,
        apellido_materno: apellidoM,
        fecha_nacimiento: fechaNacimiento,
    };
}
