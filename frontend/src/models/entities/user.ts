export enum UserType {
  USER,
  ADMIN,
}

export interface User {
  id: number;
  nombres: string;
  apellidoP: string;
  apellidoM: string | null | undefined;
  email: string;
  tipo: UserType;
  fechaNacimiento: Date;
}
