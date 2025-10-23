const { validarCampos } = require("../src/registrar_usuario.js");

describe("validarCampos()", () => {
  test("devuelve false si algún campo está vacío", () => {
    const usuario = {
      nombre: "",
      correo: "lucas@mail.com",
      contrasena: "12345",
      telefono: "77777777",
      fechaNacimiento: "2000-01-01"
    };
    expect(validarCampos(usuario)).toBe(false);
  });
});
