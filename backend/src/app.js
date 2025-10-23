import express from "express";
import { registrarRefugio } from "./refugios.js";

const app = express();
app.use(express.json());

app.post("/api/refugios", registrarRefugio);

export default app;

// Solo inicia el servidor si se ejecuta directamente (no durante los tests)
if (process.env.NODE_ENV !== "test") {
  const PORT = 4000;
  app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));
}
