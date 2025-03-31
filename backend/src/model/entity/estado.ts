import { SearchableString } from "../value_object/searchable.string.js";
import { Ciudad } from "./ciudad.js";

export interface Estado {
  id: number;
  nombre: string;

  Ciudades?: Ciudad;
}

export interface NuevoEstado {
  nombre: string;
}

export interface EstadoCriteria {
  nombre?: SearchableString;
}
