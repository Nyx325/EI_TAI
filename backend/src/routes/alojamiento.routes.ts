import { Router } from "express";
import { alojamientoPrismaRepository as repo } from "../model/repository/alojamiento.prisma.repository.js";
import HttpHandler from "../handler/http.handler.js";
import AlojamientoController from "../controller/alojamiento.http.controller.js";

const router = Router();

const ctrl = new AlojamientoController(repo);
const handler = new HttpHandler(ctrl);

router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));
router.post("/", handler.add.bind(handler));
router.put("/", handler.update.bind(handler));
router.delete("/:id", handler.delete.bind(handler));

export default router;
