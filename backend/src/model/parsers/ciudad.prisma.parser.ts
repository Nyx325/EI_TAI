import { Ciudad } from "../entity/ciudad.js";
import { Ciudad as PrismaCiudad } from "@prisma/client";

export function fromCiudad(c: Ciudad): PrismaCiudad {
  const { estadoId, ...restC } = c;
  return {
    ...restC,
    estadoId: estadoId ? estadoId : null,
  };
}

export function toCiudad(pc: PrismaCiudad): Ciudad {
  const { estadoId, ...restC } = pc;
  return {
    ...restC,
    estadoId: estadoId ? estadoId : undefined,
  };
}
