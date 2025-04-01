import { Alojamiento } from "../entity/alojamiento.js";

export function alojamientoToJson(data: Alojamiento): unknown {
  const { precioPorNoche, aireAcondicionado, ciudadId, ...restData } = data;

  const a = {
    ...restData,
    precio_por_noche: precioPorNoche,
    aire_acondicionado: aireAcondicionado,
    ciudad_id: ciudadId,
  };
  return a;
}
