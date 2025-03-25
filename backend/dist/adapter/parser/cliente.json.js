export const clienteToJson = (c) => {
    const { apellidoP, apellidoM, fechaCreacion, fechaNacimiento, ...restC } = c;
    return {
        ...restC,
        apellido_paterno: apellidoP,
        apellido_materno: apellidoM,
        fecha_creacion: fechaCreacion,
        fecha_nacimiento: fechaNacimiento,
    };
};
