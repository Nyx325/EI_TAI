import { Alojamiento as PrismaAlojamiento } from "@prisma/client";
import { Alojamiento, NewAlojamiento } from "../entity/alojamiento.js";
import { Decimal } from "@prisma/client/runtime/library";

export function toAlojamiento(
  prismaAlojamiento: PrismaAlojamiento,
): Alojamiento {
  const { precioPorNoche, latitud, longitud, ciudadId, ...restA } =
    prismaAlojamiento;

  return {
    precioPorNoche: precioPorNoche.toNumber(),
    latitud: latitud.toNumber(),
    longitud: longitud.toNumber(),
    ciudadId: ciudadId ? ciudadId : undefined,
    ...restA,
  };
}

export function fromAlojamiento(alojamiento: Alojamiento): PrismaAlojamiento {
  const { precioPorNoche, latitud, longitud, ciudadId, ...restA } = alojamiento;
  return {
    precioPorNoche: new Decimal(precioPorNoche),
    latitud: new Decimal(latitud),
    longitud: new Decimal(longitud),
    ciudadId: ciudadId ? ciudadId : null,
    ...restA,
  };
}

export function fromNewAlojamiento(
  alojamiento: NewAlojamiento,
): Omit<PrismaAlojamiento, "id"> {
  const { precioPorNoche, latitud, longitud, ...restA } = alojamiento;
  return {
    precioPorNoche: new Decimal(precioPorNoche),
    latitud: new Decimal(latitud),
    longitud: new Decimal(longitud),
    ...restA,
  };
}
