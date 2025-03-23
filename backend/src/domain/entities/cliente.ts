import { SearchableString } from "../value_objects/string.criteria.js";

export interface Cliente {
  id: number;
  nombres: string;
  apellidoP: string;
  apellidoM: string | null | undefined;
  fechaNacimiento: Date;
  fechaCreacion: Date;
  email: string;
  password: string;
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

// Para req.body
export interface ClienteJson {
  id?: unknown;
  nombres?: unknown;
  apellido_paterno?: unknown;
  apellido_materno?: unknown;
  fecha_nacimiento?: unknown;
  email?: unknown;
  password?: unknown;
}

// Para el req.query de express
export interface ClienteCriteriaQuery {
  nombres?: unknown;
  apellidoP?: unknown;
  apellidoM?: unknown;
  fechaN?: unknown;
  fechaCreacion?: unknown;
  email?: unknown;
  page?: unknown;
}
