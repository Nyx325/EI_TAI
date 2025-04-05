import { createHttpController } from "./controller";
import {
  Alojamiento,
  AlojamientoCriteria,
  NewAlojamiento,
} from "../models/entities/alojamiento";

const alojamientoHttpController = createHttpController<
  Alojamiento,
  NewAlojamiento,
  AlojamientoCriteria,
  number
>({ endpoint: "alojamiento" });

export default alojamientoHttpController;
