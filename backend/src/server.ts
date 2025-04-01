import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import clienteRouter from "./routes/cliente.routes.js";
import alojamientoRouter from "./routes/alojamiento.routes.js";
import reservaRouter from "./routes/reserva.routes.js";
import authRouter from "./routes/auth.routes.js";
import estadoRouter from "./routes/estados.routes.js";
import ciudadRouter from "./routes/ciudad.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/cliente", clienteRouter);
app.use("/alojamiento", alojamientoRouter);
app.use("/reserva", reservaRouter);
app.use("/estados", estadoRouter);
app.use("/ciudad", ciudadRouter);
app.use("/", authRouter);

app.use("", (_req, res) => {
  res.status(400).json({ message: "No se encontró el endpoint" });
});

app.listen(PORT, () => {
  console.log(`Local API running on http://localhost:${PORT}`);
});
