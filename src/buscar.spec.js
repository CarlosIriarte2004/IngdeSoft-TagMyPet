const { categoriaEdad } = require("./buscar.js");

test("categoriaEdad mapea correctamente los rangos", () => {
  expect(categoriaEdad(0.2)).toBe("cachorro"); // < 1
  expect(categoriaEdad(1)).toBe("adulto");     // 1..7.999
  expect(categoriaEdad(7.9)).toBe("adulto");
  expect(categoriaEdad(8)).toBe("senior");     // >= 8
});