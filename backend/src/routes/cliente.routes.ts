import { Router } from "express";
import ClienteController from "../controller/cliente.http.controller.js";

import { clientePrismaRepository as repo } from "../model/repository/cliente.prisma.repository.js";
import HttpHandler from "../handler/http.handler.js";

const router = Router();

const ctrl = new ClienteController(repo);
const handler = new HttpHandler(ctrl);

router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));
router.post("/", handler.add.bind(handler));
router.put("/", handler.update.bind(handler));
router.delete("/:id", handler.delete.bind(handler));

export default router;
