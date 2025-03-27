export function alojamientoToJson(data) {
    const { precioPorNoche, aireAcondicionado, ...restData } = data;
    return {
        ...restData,
        precio_por_noche: precioPorNoche,
        aire_acondicionado: aireAcondicionado,
    };
}
