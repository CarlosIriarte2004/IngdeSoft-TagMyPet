export function validarRefugio({ nombre, direccion, rut, correo, telefono }) {
  if (!nombre || !direccion || !rut || !correo || !telefono) {
    return { ok: false, msg: "Complete los datos requeridos del refugio." };
  }
  const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!mailOk) return { ok: false, msg: "Correo inválido." };
  return { ok: true };
}
