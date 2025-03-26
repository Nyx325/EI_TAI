import { Alojamiento as PrismaAlojamiento } from "@prisma/client";
import { Alojamiento, NewAlojamiento } from "../entity/alojamiento.js";
import { Decimal } from "@prisma/client/runtime/library";

export function toAlojamiento(
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
    latitud: prismaAlojamiento.latitud.toNumber(),
    longitud: prismaAlojamiento.longitud.toNumber(),
  };
}

export function fromAlojamiento(alojamiento: Alojamiento): PrismaAlojamiento {
  return {
    id: alojamiento.id,
    descripcion: alojamiento.descripcion,
    banios: alojamiento.banios,
    alberca: alojamiento.alberca,
    cocina: alojamiento.cocina,
    wifi: alojamiento.wifi,
    television: alojamiento.television,
    aireAcondicionado: alojamiento.aireAcondicionado,
    precioPorNoche: new Decimal(alojamiento.precioPorNoche),
    latitud: new Decimal(alojamiento.latitud),
    longitud: new Decimal(alojamiento.longitud),
  };
}

export function fromNewAlojamiento(
  alojamiento: NewAlojamiento,
): Omit<PrismaAlojamiento, "id"> {
  return {
    descripcion: alojamiento.descripcion,
    banios: alojamiento.banios,
    alberca: alojamiento.alberca,
    cocina: alojamiento.cocina,
    wifi: alojamiento.wifi,
    television: alojamiento.television,
    aireAcondicionado: alojamiento.aireAcondicionado,
    precioPorNoche: new Decimal(alojamiento.precioPorNoche),
    latitud: new Decimal(alojamiento.latitud),
    longitud: new Decimal(alojamiento.longitud),
  };
}
