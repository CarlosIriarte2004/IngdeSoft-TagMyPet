import express from "express";
import { router as refugiosRouter } from "./refugios.js";

const app = express();
app.use(express.json());
app.use("/api/refugios", refugiosRouter);

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = 4000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}
