import { SearchableString } from "../value_object/searchable.string.js";

export enum TipoCliente {
  USER,
  ADMIN,
}

export interface Cliente {
  id: number;
  nombres: string;
  apellidoP: string;
  apellidoM: string | null | undefined;
  tipo: TipoCliente;
  email: string;
  password: string;
  fechaNacimiento: Date;
  fechaCreacion: Date;
}

export interface ClienteNuevo {
  nombres: string;
  apellidoP: string;
  apellidoM: string | null | undefined;
  fechaNacimiento: Date;
  tipo?: TipoCliente;
  email: string;
  password: string;
}

export interface ClienteCriteria {
  nombres?: SearchableString;
  apellidoP?: SearchableString;
  apellidoM?: SearchableString;
  email?: SearchableString;
  fechaNacimiento?: Date;
}
