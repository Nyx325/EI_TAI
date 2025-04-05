export interface Ciudad {
  id: number;
  nombre: string;
  estado_id?: number;
}

export interface NuevaCiudad {
  nombre: string;
  estado_id: number;
}

export interface CiudadCriteria {
  nombre?: string;
  estadoId?: number;
}
