import { Router } from "express";
import {alojamientoPrismaRepository as repo} from "../implementation/alojamiento.prisma.js";
import AlojamientoController from "../adapter/controller/alojamiento.controller.js";
import HttpHandler from "../adapter/handler/http.handler.js";

const controller = new AlojamientoController(repo);
export const handler = new HttpHandler(controller);

const router = Router();

router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));
router.post("/", handler.add.bind(handler));
router.put("/", handler.update.bind(handler));
router.delete("/:id", handler.delete.bind(handler));

export default router;
