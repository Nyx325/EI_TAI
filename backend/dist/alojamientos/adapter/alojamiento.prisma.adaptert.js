import { Decimal } from "@prisma/client/runtime/library";
/**
 * Función que convierte una instancia del tipo creado
 * por Prisma para Alojamiento a nuestra interfaz local
 * de Alojamiento
 *
 * @param prismaAlojamiento La instancia del tipo creado
 * por prisma
 */
export function convertPrismaToAlojamiento(prismaAlojamiento) {
    const { precioPorNoche, latitud, longitud, ...restAlojamiento } = prismaAlojamiento;
    return {
        ...restAlojamiento,
        precioPorNoche: precioPorNoche.toNumber(),
        latitud: latitud.toNumber(),
        longitud: longitud.toNumber(),
    };
}
/**
 * Función que convierte una instancia de nuestra interfaz
 * Alojamiento al tipo creado por Prisma
 *
 * @param data Instancia de nuestra interfaz
 */
export function convertAlojamientoToPrisma(data) {
    const { precioPorNoche, latitud, longitud, ...restAlojamiento } = data;
    return {
        ...restAlojamiento,
        precioPorNoche: new Decimal(precioPorNoche),
        latitud: new Decimal(latitud),
        longitud: new Decimal(longitud),
    };
}
