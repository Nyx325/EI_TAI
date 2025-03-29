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
