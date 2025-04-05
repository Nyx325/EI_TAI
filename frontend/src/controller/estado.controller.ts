import { createHttpController } from "./controller";
import { Estado, EstadoCriteria, NuevoEstado } from "../models/entities/estado";

const estadoHttpController = createHttpController<
  Estado,
  NuevoEstado,
  EstadoCriteria,
  number
>({ endpoint: "estados" });

export default estadoHttpController;
