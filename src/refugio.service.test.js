import { validarRefugio } from "./refugio.service.js";

describe("validarRefugio (frontend)", () => {
  const base = {
    nombre: "Refugio Esperanza",
    direccion: "Av. Central 101",
    rut: "RUT-001",
    correo: "refugio@mail.com",
    telefono: "7777777",
  };

  it("retorna error si falta algún campo obligatorio", () => {
    const { ok, msg } = validarRefugio({ ...base, correo: "" });
    expect(ok).toBe(false);
    expect(msg).toBe("Complete los datos requeridos del refugio.");
  });
});
