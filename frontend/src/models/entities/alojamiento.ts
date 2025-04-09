export interface Alojamiento {
  id: number;
  titulo: string;
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
  titulo: string;
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

export interface AlojamientoCriteria {
  titulo?: string;
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
