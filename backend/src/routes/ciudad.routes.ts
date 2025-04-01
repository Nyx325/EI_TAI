import { Router } from "express";
import CiudadController from "../controller/ciudad.http.controller.js";
import repo from "../model/repository/ciudad.prisma.repository.js";
import edoRepo from "../model/repository/estado.prisma.repository.js";
import HttpHandler from "../handler/http.handler.js";

const router = Router();

const ctrl = new CiudadController(repo, edoRepo);
const handler = new HttpHandler(ctrl);

router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));

export default router;
