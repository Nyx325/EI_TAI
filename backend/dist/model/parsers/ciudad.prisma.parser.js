export function fromCiudad(c) {
    const { estadoId, ...restC } = c;
    return {
        ...restC,
        estadoId: estadoId ? estadoId : null,
    };
}
export function toCiudad(pc) {
    const { estadoId, ...restC } = pc;
    return {
        ...restC,
        estadoId: estadoId ? estadoId : undefined,
    };
}
