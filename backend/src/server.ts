import express from "express";
import { PORT } from "./config.js";
import clienteRouter from "./routes/cliente.routes.js";

const app = express();
app.use(express.json());

app.use("/cliente", clienteRouter);
app.use("", (_req, res) => {
  res.status(400).json({ message: "No se encontró el endpoint" });
});

app.listen(PORT, () => {
  console.log(`Local API running on http://localhost:${PORT}`);
});
