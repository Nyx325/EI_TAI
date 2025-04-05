import { createHttpController } from "./controller";
import {
  Cliente,
  ClienteNuevo,
  ClienteCriteria,
} from "../models/entities/cliente";

const clienteHttpController = createHttpController<
  Cliente,
  ClienteNuevo,
  ClienteCriteria,
  number
>({ endpoint: "cliente" });

export default clienteHttpController;
