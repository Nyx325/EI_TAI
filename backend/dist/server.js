import express from "express";
import { PORT } from "./config.js";
import clienteRouter from "./routes/cliente.routes.js";
import alojamientoRouter from "./routes/alojamiento.routes.js";
import reservaRouter from "./routes/reserva.routes.js";
const app = express();
app.use(express.json());
app.use("/cliente", clienteRouter);
app.use("/alojamiento", alojamientoRouter);
app.use("/reserva", reservaRouter);
app.use("", (_req, res) => {
    res.status(400).json({ message: "No se encontró el endpoint" });
});
app.listen(PORT, () => {
    console.log(`Local API running on http://localhost:${PORT}`);
});
