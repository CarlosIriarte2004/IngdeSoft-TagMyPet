import { Router } from "express";

export const router = Router();

router.post("/", (req, res) => {
  const { nombre, direccion, rut, correo, telefono } = req.body;

  if (!nombre || !direccion || !rut || !correo || !telefono) {
    return res.status(400).json({ message: "Complete los datos requeridos del refugio." });
  }

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo)) {
    return res.status(400).json({ message: "Correo inválido." });
  }

  return res
    .status(201)
    .json({ message: "Refugio registrado exitosamente, pendiente de verificación." });
});
