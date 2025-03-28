import { Router } from "express";
import ReservaController from "../controller/reserva.http.controller.js";
import HttpHandler from "../handler/http.handler.js";
import { reservaPrismaRepository as repo } from "../model/repository/reserva.prisma.repository.js";
import { clientePrismaRepository as clienteRepo } from "../model/repository/cliente.prisma.repository.js";
import { alojamientoPrismaRepository as alojamientoRepo } from "../model/repository/alojamiento.prisma.repository.js";

const router = Router();

const ctrl = new ReservaController({
  repo,
  clienteRepo,
  alojamientoRepo,
});
const handler = new HttpHandler(ctrl);

router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));
router.post("/", handler.add.bind(handler));
router.put("/", handler.update.bind(handler));
router.delete("/:id", handler.delete.bind(handler));

export default router;
