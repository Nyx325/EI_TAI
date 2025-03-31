import { SearchableString } from "../value_object/searchable.string.js";

export interface Ciudad {
  id: number;
  nombre: string;
  estadoId?: number;
}

export interface NuevaCiudad {
  nombre: string;
  estadoId: number;
}

export interface CiudadCriteria {
  nombre?: SearchableString;
  estadoId?: number;
}
