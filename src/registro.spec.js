/**
 * @jest-environment jsdom
 */

// Mock localStorage
const createLocalStorageMock = () => {
  let store = {};
  return {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
  };
};
if (!global.localStorage) {
  Object.defineProperty(window, "localStorage", { value: createLocalStorageMock() });
  Object.defineProperty(global, "localStorage", { value: window.localStorage });
}

function mountDOM() {
  document.body.innerHTML = `
    <form id="formRegistroMascota">
      <input id="nombre" name="nombre" />
      <input id="edad" name="edad" />
      <select id="especie" name="especie">
        <option value="">Seleccione...</option>
        <option>Perro</option>
      </select>
      <input id="raza" name="raza" />
      <input id="foto" name="foto" type="file" />
    </form>
    <p id="mensaje"></p>
    <div id="listaMascotas"></div>
    <img id="photo-preview" />
  `;
}

let Registro;

beforeEach(async () => {
  mountDOM();
  Registro = await import("./registro.js");
  Registro.bindDOM(document);
  localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("validación falla cuando faltan campos", () => {
  document.getElementById("nombre").value = "Lucky";
  document.getElementById("edad").value = "3";
  document.getElementById("especie").value = ""; // falta especie
  document.getElementById("raza").value = "Golden";
  const res = Registro.validate(document.getElementById("formRegistroMascota"));
  expect(res.isValid).toBe(false);
});

test("muestra mensaje de error", () => {
  Registro.showMessage("Complete todos los campos requeridos.", "error");
  expect(document.getElementById("mensaje").textContent)
    .toBe("Complete todos los campos requeridos.");
});

test("guarda mascota y renderiza lista", () => {
  Registro.setMascotas([
    { id: 1, nombre: "Lucky", especie: "Perro", raza: "Golden", edad: 3, foto: "data:image/png;base64,xx" }
  ]);
  const count = Registro.renderLista(Registro.getMascotas(), document.getElementById("listaMascotas"));
  expect(count).toBe(1);
  expect(document.getElementById("listaMascotas").textContent).toMatch("Lucky");
});

test("validación correcta con todos los campos", () => {
  document.getElementById("nombre").value = "Mishi";
  document.getElementById("edad").value = "2";
  document.getElementById("especie").value = "Perro";
  document.getElementById("raza").value = "Criollo";
  const file = new File(["x"], "foto.png", { type: "image/png" });
  Object.defineProperty(document.getElementById("foto"), "files", { value: [file] });
  const res = Registro.validate(document.getElementById("formRegistroMascota"));
  expect(res.isValid).toBe(true);
});
