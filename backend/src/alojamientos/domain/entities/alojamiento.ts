export default interface Alojamiento {
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
