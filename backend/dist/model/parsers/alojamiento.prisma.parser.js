import { Decimal } from "@prisma/client/runtime/library";
export function toAlojamiento(prismaAlojamiento) {
    const { precioPorNoche, latitud, longitud, ciudadId, ...restA } = prismaAlojamiento;
    return {
        precioPorNoche: precioPorNoche.toNumber(),
        latitud: latitud.toNumber(),
        longitud: longitud.toNumber(),
        ciudadId: ciudadId ?? undefined,
        ...restA,
    };
}
export function fromAlojamiento(alojamiento) {
    const { precioPorNoche, latitud, longitud, ciudadId, ...restA } = alojamiento;
    return {
        precioPorNoche: new Decimal(precioPorNoche),
        latitud: new Decimal(latitud),
        longitud: new Decimal(longitud),
        ciudadId: ciudadId ?? null,
        ...restA,
    };
}
export function fromNewAlojamiento(alojamiento) {
    const { precioPorNoche, latitud, longitud, ...restA } = alojamiento;
    return {
        precioPorNoche: new Decimal(precioPorNoche),
        latitud: new Decimal(latitud),
        longitud: new Decimal(longitud),
        ...restA,
    };
}
