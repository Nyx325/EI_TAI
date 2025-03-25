import { Alojamiento, AlojamientoJson } from "../../domain/entities/alojamiento.js";

export const alojamientoToAlojamientoJson = (alojamiento: Alojamiento): AlojamientoJson => {
  const { precioPorNoche, aireAcondicionado, ...restAlojamiento } = alojamiento;

  return {
    ...restAlojamiento,
    precio_por_noche: precioPorNoche,
    aire_acondicionado: aireAcondicionado
  };
}
