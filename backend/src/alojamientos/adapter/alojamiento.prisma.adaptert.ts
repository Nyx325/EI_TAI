import { Decimal } from "@prisma/client/runtime/library";
import { Alojamiento as PrismaAlojamiento } from "@prisma/client";
import Alojamiento from "../domain/entities/alojamiento.js";

export function convertPrismaToAlojamiento(
  prismaAlojamiento: PrismaAlojamiento,
): Alojamiento {
  return {
    id: prismaAlojamiento.id,
    descripcion: prismaAlojamiento.descripcion,
    banios: prismaAlojamiento.banios,
    alberca: prismaAlojamiento.alberca,
    cocina: prismaAlojamiento.cocina,
    wifi: prismaAlojamiento.wifi,
    television: prismaAlojamiento.television,
    aireAcondicionado: prismaAlojamiento.aireAcondicionado,
    precioPorNoche: prismaAlojamiento.precioPorNoche.toNumber(),
    direccion: prismaAlojamiento.direccion,
    ciudad: prismaAlojamiento.ciudad,
    estado: prismaAlojamiento.estado,
    pais: prismaAlojamiento.pais,
    codigoPostal: prismaAlojamiento.codigoPostal,
    latitud: prismaAlojamiento.latitud.toNumber(),
    longitud: prismaAlojamiento.longitud.toNumber(),
  };
}

// Esta función toma un objeto de dominio y lo transforma al formato que espera Prisma.
export function convertAlojamientoToPrisma(data: Alojamiento) {
  return {
    // El campo id se utiliza normalmente en el where, por lo que lo omitimos en create.
    descripcion: data.descripcion,
    banios: data.banios,
    alberca: data.alberca,
    cocina: data.cocina,
    wifi: data.wifi,
    television: data.television,
    aireAcondicionado: data.aireAcondicionado,
    // Convertimos los números a Decimal
    precioPorNoche: new Decimal(data.precioPorNoche),
    direccion: data.direccion,
    ciudad: data.ciudad,
    estado: data.estado,
    pais: data.pais,
    codigoPostal: data.codigoPostal,
    latitud: new Decimal(data.latitud),
    longitud: new Decimal(data.longitud),
  };
}
