import { Decimal } from "@prisma/client/runtime/library";
export function toAlojamiento(prismaAlojamiento) {
    const { precioPorNoche, latitud, longitud, ...restA } = prismaAlojamiento;
    return {
        precioPorNoche: precioPorNoche.toNumber(),
        latitud: latitud.toNumber(),
        longitud: longitud.toNumber(),
        ...restA
    };
}
export function fromAlojamiento(alojamiento) {
    const { precioPorNoche, latitud, longitud, ...restA } = alojamiento;
    return {
        precioPorNoche: new Decimal(precioPorNoche),
        latitud: new Decimal(latitud),
        longitud: new Decimal(longitud),
        ...restA
    };
}
export function fromNewAlojamiento(alojamiento) {
    const { precioPorNoche, latitud, longitud, ...restA } = alojamiento;
    return {
        precioPorNoche: new Decimal(precioPorNoche),
        latitud: new Decimal(latitud),
        longitud: new Decimal(longitud),
        ...restA
    };
}
