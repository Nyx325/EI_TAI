import { SearchableString } from "../value_object/searchable.string.js";

export interface Cliente {
  id: number;
  nombres: string;
  apellidoP: string;
  apellidoM: string | null | undefined;
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
