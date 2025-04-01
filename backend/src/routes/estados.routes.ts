import { Router } from "express";
import EstadoController from "../controller/estado.http.controller.js";
import repo from "../model/repository/estado.prisma.repository.js";
import HttpHandler from "../handler/http.handler.js";

const router = Router();

const ctrl = new EstadoController(repo);
const handler = new HttpHandler(ctrl);

router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));

export default router;
