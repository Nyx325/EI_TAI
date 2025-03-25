export const alojamientoToAlojamientoJson = (alojamiento) => {
    const { precioPorNoche, aireAcondicionado, ...restAlojamiento } = alojamiento;
    return {
        ...restAlojamiento,
        precio_por_noche: precioPorNoche,
        aire_acondicionado: aireAcondicionado
    };
};
