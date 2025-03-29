export interface User {
  id: number;
  nombres: string;
  apellidoP: string;
  apellidoM: string | null | undefined;
  email: string;
  fechaNacimiento: Date;
}
