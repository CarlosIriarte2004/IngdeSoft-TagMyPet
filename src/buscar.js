function categoriaEdad(edad) {
  if (edad < 1) return "cachorro";
  if (edad >= 8) return "senior";
  return "adulto";
}

module.exports = { categoriaEdad };