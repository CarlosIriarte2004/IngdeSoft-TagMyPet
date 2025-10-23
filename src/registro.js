// src/registro.js
const form = document.querySelector("#formRegistroMascota");
const mensaje = document.querySelector("#mensaje");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const edad = form.edad.value.trim();
  const especie = form.especie.value;
  const raza = form.raza.value.trim();

  if (!nombre || !edad || !especie || !raza) {
    mensaje.textContent = "⚠️ Todos los campos son obligatorios.";
    mensaje.style.color = "red";
    return;
  }

  // Crear objeto mascota
  const mascota = {
    nombre,
    edad: Number(edad),
    especie,
    raza,
    id: Date.now(),
  };

  // Guardar en localStorage
  const mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
  mascotas.push(mascota);
  localStorage.setItem("mascotas", JSON.stringify(mascotas));

  mensaje.textContent = "✅ Mascota registrada con éxito.";
  mensaje.style.color = "green";
  form.reset();
});
