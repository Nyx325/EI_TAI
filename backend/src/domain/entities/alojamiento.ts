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
  latitud?: number;
  longitud?: number;
}

export interface AlojamientoJson {
  id?: unknown;
  descripcion?: unknown;
  banios?: unknown;
  alberca?: unknown;
  cocina?: unknown;
  wifi?: unknown;
  television?: unknown;
  aire_acondicionado?: unknown;
  precio_por_noche?: unknown;
  latitud?: unknown;
  longitud?: unknown;
}

export interface AlojamientoCriteriaJson {
  id?: unknown;
  descripcion?: unknown;
  banios?: unknown;
  alberca?: unknown;
  cocina?: unknown;
  wifi?: unknown;
  television?: unknown;
  aire_acondicionado?: unknown;
  precio_por_noche?: unknown;
  latitud?: unknown;
  longitud?: unknown;
}
