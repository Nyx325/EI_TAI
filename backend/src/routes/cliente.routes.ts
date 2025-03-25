import { Router } from "express";
import { clientePrismaRepository as repo } from "../implementation/cliente.prisma.js";
import ClienteController from "../adapter/controller/cliente.controller.js";
import HttpHandler from "../adapter/handler/http.handler.js";


const controller = new ClienteController(repo);
export const handler = new HttpHandler(controller);

const router = Router();

router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));
router.post("/", handler.add.bind(handler));
router.put("/", handler.update.bind(handler));
router.delete("/:id", handler.delete.bind(handler));

export default router;
