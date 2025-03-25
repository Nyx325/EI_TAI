import express from "express";
import { PORT } from "./config.js";
import alojamientoRouter from "./routes/alojamiento.routes.js";
import clienteRouter from "./routes/cliente.routes.js";
const app = express();
app.use(express.json());
app.use("/alojamiento", alojamientoRouter);
app.use("/cliente", clienteRouter);
app.listen(PORT, () => {
    console.log(`Local API running on http://localhost:${PORT}`);
});
