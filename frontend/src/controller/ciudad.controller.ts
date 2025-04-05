import { createHttpController } from "./controller";
import { Ciudad, NuevaCiudad, CiudadCriteria } from "../models/entities/ciudad";

const ciudadHttpController = createHttpController<
  Ciudad,
  NuevaCiudad,
  CiudadCriteria,
  number
>({ endpoint: "ciudad" });

export default ciudadHttpController;
