import express from "express";
import cors from "cors";
import { registrarRefugio } from "./refugios.js";

const app = express();
app.use(cors());          // 👈 habilita CORS
app.use(express.json());

app.post("/api/refugios", registrarRefugio);

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = 4000;
  app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
}
