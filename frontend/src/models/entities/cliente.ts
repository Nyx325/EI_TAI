export enum TipoCliente {
  USER,
  ADMIN,
}

export interface Cliente {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string | null | undefined;
  tipo: TipoCliente;
  email: string;
  fecha_nacimiento: Date;
}

export interface ClienteNuevo {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string | null | undefined;
  fecha_nacimiento: Date;
  tipo?: TipoCliente;
  email: string;
  password: string;
}

export interface ClienteCriteria {
  nombres?: string;
  apellidoP?: string;
  apellidoM?: string;
  email?: string;
  fechaNacimiento?: Date;
}
