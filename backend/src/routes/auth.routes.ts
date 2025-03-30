import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { clientePrismaRepository as repo } from "../model/repository/cliente.prisma.repository.js";
import { clienteToJson } from "../model/parsers/cliente.parser.js";

const router = Router();

const ctrl = new AuthController(repo);

router.post("/login", async (req, res) => {
  try {
    const result = await ctrl.login(req.body);
    result.match(
      (client) => {
        res.status(200).json(clienteToJson(client));
      },
      (errors) => {
        res.status(401).json({
          message: "Autenticación no exitosa",
          errors,
        });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
