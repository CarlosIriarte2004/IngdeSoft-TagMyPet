import request from "supertest";
import app from "../src/app.js";

describe("POST /api/refugios", () => {

  it("falla si faltan campos obligatorios", async () => {
    const res = await request(app).post("/api/refugios").send({
      nombre: "",
      direccion: "",
      rut: "",
      correo: "",
      telefono: ""
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Complete los datos requeridos del refugio.");
  });

  it("falla si el correo es inválido", async () => {
    const res = await request(app).post("/api/refugios").send({
      nombre: "Refugio Amor Animal",
      direccion: "Calle 1",
      rut: "RUT001",
      correo: "correo-malo",
      telefono: "777"
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Correo inválido.");
  });

  it("registra correctamente un refugio válido", async () => {
    const res = await request(app).post("/api/refugios").send({
      nombre: "Refugio Esperanza",
      direccion: "Av. Central",
      rut: "RUT777",
      correo: "refugio@mail.com",
      telefono: "777"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe(
      "Refugio registrado exitosamente, pendiente de verificación."
    );
  });
});
