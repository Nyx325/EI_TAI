import express from "express";
import { PORT } from "./config.js";
import alojamientoRouter from "./routes/alojamiento.js"

const app = express();
app.use(express.json());

app.use("/alojamiento", alojamientoRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
