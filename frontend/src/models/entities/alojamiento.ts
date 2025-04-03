export interface Alojamiento {
  id: number;
  descripcion: string;
  banios: number;
  alberca: boolean;
  cocina: boolean;
  wifi: boolean;
  television: boolean;
  aire_acondicionado: boolean;
  precio_por_noche: number;
  latitud: number;
  longitud: number;
}

export interface NewAlojamiento {
  descripcion: string;
  banios: number;
  alberca: boolean;
  cocina: boolean;
  wifi: boolean;
  television: boolean;
  aire_acondicionado: boolean;
  precio_por_noche: number;
  latitud: number;
  longitud: number;
  ciudad_id: number;
}

export interface AlojamientoCriteria {
  descripcion?: string;
  banios?: number;
  alberca?: boolean;
  cocina?: boolean;
  wifi?: boolean;
  television?: boolean;
  aireAcondicionado?: boolean;
  precioPorNoche?: number;
  latitud?: number;
  longitud?: number;
  ciudadId?: number;
}
