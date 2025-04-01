export function alojamientoToJson(data) {
    const { precioPorNoche, aireAcondicionado, ciudadId, ...restData } = data;
    const a = {
        ...restData,
        precio_por_noche: precioPorNoche,
        aire_acondicionado: aireAcondicionado,
        ciudad_id: ciudadId,
    };
    return a;
}
