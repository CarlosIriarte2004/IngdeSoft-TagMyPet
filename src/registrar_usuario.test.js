const { validarCampos } = require("./registrar_usuario.js");

test("todos los campos completos", () => {
  const usuario = {
    nombre: "Lucas",
    correo: "lucas@mail.com",
    contrasena: "12345",
    telefono: "77777777",
    fechaNacimiento: "2000-01-01"
  };
  expect(validarCampos(usuario)).toBe(true);
});

test("detecta campos vacíos", () => {
  const usuario = {
    nombre: "",
    correo: "lucas@mail.com",
    contrasena: "12345",
    telefono: "77777777",
    fechaNacimiento: "2000-01-01"
  };
  expect(validarCampos(usuario)).toBe(false);
});
