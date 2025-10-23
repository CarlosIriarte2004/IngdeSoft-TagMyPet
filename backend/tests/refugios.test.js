import request from "supertest";
import app from "../src/app.js";

describe("POST /api/refugios", () => {
  it("falla si faltan campos obligatorios", async () => {
    const res = await request(app).post("/api/refugios").send({
      nombre: "",
      direccion: "Av. Siempre Viva 123",
      rut: "12345678-9",
      correo: "correo@refugio.com",
      telefono: "77777777"
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Complete los datos requeridos del refugio.");
  });

  it("falla si el correo es inválido", async () => {
    const res = await request(app).post("/api/refugios").send({
      nombre: "Refugio Amigos",
      direccion: "Calle 45",
      rut: "12345678-9",
      correo: "correo_invalido",
      telefono: "77777777"
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Correo inválido.");
  });

  it("registra correctamente un refugio válido", async () => {
    const res = await request(app).post("/api/refugios").send({
      nombre: "Refugio Patitas",
      direccion: "Av. Central 101",
      rut: "99999999-9",
      correo: "patitas@refugio.com",
      telefono: "76543210"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Refugio registrado exitosamente, pendiente de verificación.");
  });
});
