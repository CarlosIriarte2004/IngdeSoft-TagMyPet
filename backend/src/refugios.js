export const registrarRefugio = (req, res) => {
  const { nombre, direccion, rut, correo, telefono } = req.body;

  // Verificar campos obligatorios
  if (!nombre || !direccion || !rut || !correo || !telefono) {
    return res.status(400).json({ message: "Complete los datos requeridos del refugio." });
  }

  // Validar formato de correo
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(correo)) {
    return res.status(400).json({ message: "Correo inválido." });
  }

  // Simular registro exitoso
  return res.status(201).json({ message: "Refugio registrado exitosamente, pendiente de verificación." });
};
