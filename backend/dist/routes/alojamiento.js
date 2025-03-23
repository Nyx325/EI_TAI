import { Router } from "express";
import { alojamientoPrismaHandler as handler } from "../implementation/alojamiento.prisma.js";
const router = Router();
router.get("/", handler.getBy.bind(handler));
router.get("/:id", handler.get.bind(handler));
router.post("/", handler.add.bind(handler));
router.put("/", handler.update.bind(handler));
router.delete("/:id", handler.delete.bind(handler));
export default router;
