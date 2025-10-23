const { categoriaEdad, filtrarMascotas } = require("./buscar.js");

test("categoriaEdad mapea correctamente los rangos", () => {
  expect(categoriaEdad(0.2)).toBe("cachorro"); // < 1
  expect(categoriaEdad(1)).toBe("adulto");     // 1..7.999
  expect(categoriaEdad(7.9)).toBe("adulto");
  expect(categoriaEdad(8)).toBe("senior");     // >= 8
});

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

test("combina edad + raza correctamente", () => {
  const lista = [
    { nombre: "A", raza: "Beagle",  edadAnios: 0.6 },
    { nombre: "B", raza: "Mestizo", edadAnios: 2   },
    { nombre: "C", raza: "Beagle",  edadAnios: 2.5 }
  ];
  const out = filtrarMascotas(lista, "adulto", "Beagle");
  expect(out.map(m => m.nombre)).toEqual(["C"]);
});

test("retorna arreglo vacío si no hay coincidencias", () => {
  const lista = [{ nombre: "X", raza: "Labrador", edadAnios: 9 }];
  const out = filtrarMascotas(lista, "cachorro", "Beagle");
  expect(out).toHaveLength(0);
});