import { Alojamiento } from "../entity/alojamiento.js";

export function alojamientoToJson(data: Alojamiento): unknown {
  const { precioPorNoche, aireAcondicionado, ...restData } = data;

  return {
    ...restData,
    precio_por_noche: precioPorNoche,
    aire_acondicionado: aireAcondicionado,
  };
}
