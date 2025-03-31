import { Router } from "express";
import { alojamientoPrismaRepository as repo } from "../model/repository/alojamiento.prisma.repository.js";
import ciudadRepository from "../model/repository/ciudad.prisma.repository.js";
import estadoRepository from "../model/repository/estado.prisma.repository.js";
import HttpHandler from "../handler/http.handler.js";
import AlojamientoController from "../controller/alojamiento.http.controller.js";

const router = Router();

const ctrl = new AlojamientoController(
  repo,
  ciudadRepository,
  estadoRepository,
);
const handler = new HttpHandler(ctrl);

router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));
router.post("/", handler.add.bind(handler));
router.put("/", handler.update.bind(handler));
router.delete("/:id", handler.delete.bind(handler));

export default router;
