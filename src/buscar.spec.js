const { categoriaEdad } = require("./buscar.js");

test("categoriaEdad mapea correctamente los rangos", () => {
  expect(categoriaEdad(0.2)).toBe("cachorro"); // < 1
  expect(categoriaEdad(1)).toBe("adulto");     // 1..7.999
  expect(categoriaEdad(7.9)).toBe("adulto");
  expect(categoriaEdad(8)).toBe("senior");     // >= 8
});

const { filtrarMascotas } = require("./buscar.js");

describe("filtrarMascotas por edad", () => {
  const lista = [
    { nombre: "A", raza: "Beagle",  edadAnios: 0.6 },
    { nombre: "B", raza: "Mestizo", edadAnios: 2 },
    { nombre: "C", raza: "Beagle",  edadAnios: 9 }
  ];

  test("devuelve solo cachorros", () => {
    const out = filtrarMascotas(lista, "cachorro", "");
    expect(out.map(m => m.nombre)).toEqual(["A"]);
  });

  test("devuelve solo senior", () => {
    const out = filtrarMascotas(lista, "senior", "");
    expect(out.map(m => m.nombre)).toEqual(["C"]);
  });
});