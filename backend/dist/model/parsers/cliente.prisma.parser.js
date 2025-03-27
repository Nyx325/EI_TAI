export function toCliente(pc) {
    return pc;
}
export function fromCliente(c) {
    const { apellidoM, ...restC } = c;
    return {
        apellidoM: apellidoM ? apellidoM : null,
        ...restC
    };
}
