import HttpHandler from "../adapter/http.handler.js";
import AlojamientoController from "../adapter/alojamiento.controller.js";
import alojamientoPrismaRepository from "./alojamiento.prisma.js";
const controller = new AlojamientoController(alojamientoPrismaRepository);
const alojamientoPrismaHandler = new HttpHandler(controller);
export default alojamientoPrismaHandler;
