import express from "express";
import { PORT } from "./config.js";
import clienteRouter from "./routes/cliente.routes.js";
import alojamientoRouter from "./routes/alojamiento.routes.js";

const app = express();
app.use(express.json());

app.use("/cliente", clienteRouter);
app.use("/alojamiento", alojamientoRouter);

import { z } from "zod";

const obj = z.object({}).superRefine(() => {});

// Extraer el esquema base antes de hacer `.merge()`
const obj2 = obj._def.schema.merge(z.object({ anotherField: z.string() }));

console.log(obj2.shape); // ✅ Funciona correctamente


app.use("", (_req, res) => {
  res.status(400).json({ message: "No se encontró el endpoint" });
});

app.listen(PORT, () => {
  console.log(`Local API running on http://localhost:${PORT}`);
});
