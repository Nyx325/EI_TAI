import { SearchableString } from "../value_objects/string.criteria.js";

export interface NewAlojamiento {
  descripcion: string;
  banios: number;
  alberca: boolean;
  cocina: boolean;
  wifi: boolean;
  television: boolean;
  aireAcondicionado: boolean;
  precioPorNoche: number;
  direccion: string;
  ciudad: string;
  estado: string;
  pais: string;
  codigoPostal: string;
  latitud: number;
  longitud: number;
}

export interface Alojamiento {
  id: number;
  descripcion: string;
  banios: number;
  alberca: boolean;
  cocina: boolean;
  wifi: boolean;
  television: boolean;
  aireAcondicionado: boolean;
  precioPorNoche: number;
  direccion: string;
  ciudad: string;
  estado: string;
  pais: string;
  codigoPostal: string;
  latitud: number;
  longitud: number;
}

export interface AlojamientoCriteria {
  descripcion?: SearchableString;
  banios?: number;
  alberca?: boolean;
  cocina?: boolean;
  wifi?: boolean;
  television?: boolean;
  aireAcondicionado?: boolean;
  precioPorNoche?: number;
  direccion?: SearchableString;
  ciudad?: SearchableString;
  estado?: SearchableString;
  pais?: SearchableString;
  codigoPostal?: SearchableString;
  latitud?: number;
  longitud?: number;
}

export interface PotentialAlojamiento {
  id?: unknown;
  descripcion?: unknown;
  banios?: unknown;
  alberca?: unknown;
  cocina?: unknown;
  wifi?: unknown;
  television?: unknown;
  aireAcondicionado?: unknown;
  precioPorNoche?: unknown;
  direccion?: unknown;
  ciudad?: unknown;
  estado?: unknown;
  pais?: unknown;
  codigoPostal?: unknown;
  latitud?: unknown;
  longitud?: unknown;
}
