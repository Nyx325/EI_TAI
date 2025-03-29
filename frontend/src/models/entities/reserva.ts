import { Alojamiento } from "./alojamiento.js";
import { User } from "./user.js";

export interface Reserva {
  id: number;
  inicio: Date;
  fin: Date;
  total: number;
  clienteId: number;
  alojamientoId: number;

  User?: User;
  Alojamiento?: Alojamiento;
}
