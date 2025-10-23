function categoriaEdad(edad) {
  if (edad < 1) return "cachorro";
  if (edad >= 8) return "senior";
  return "adulto";
}

function filtrarMascotas(lista, edadCat = "", raza = "") {
  const e = (edadCat || "").trim().toLowerCase();
  const r = (raza || "").trim().toLowerCase();

  return lista.filter(m => {
    const cat = categoriaEdad(Number(m.edadAnios));
    const passEdad = !e || cat === e;
    const passRaza = !r || (m.raza || "").toLowerCase() === r;
    return passEdad && passRaza;
  });
}

module.exports = { categoriaEdad, filtrarMascotas };