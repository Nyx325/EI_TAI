import { createHttpController } from "./controller";
import {
  Reserva,
  NewReserva,
  ReservaCriteria,
} from "../models/entities/reserva";

const reservaHttpController = createHttpController<
  Reserva,
  NewReserva,
  ReservaCriteria,
  number
>({ endpoint: "reserva" });

export default reservaHttpController;
