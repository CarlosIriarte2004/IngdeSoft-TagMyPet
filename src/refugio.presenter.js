import { validarRefugio } from "./refugio.service.js";

const form = document.getElementById("formRefugio");
const $msg = document.getElementById("mensaje");

function setMsg(text, ok=false){
  $msg.textContent = text;
  $msg.className = ok ? "ok" : "err";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMsg("", false);

  const datos = Object.fromEntries(new FormData(form));

  // 1) validación local
  const val = validarRefugio(datos);
  if (!val.ok) return setMsg(val.msg, false);

  try {
    // 2) llamada a tu backend
    const res = await fetch("http://localhost:4000/api/refugios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const data = await res.json();

    if (!res.ok) return setMsg(data.message || "Error en el registro.", false);
    setMsg(data.message, true);
    form.reset();
  } catch (err) {
    setMsg("Error de conexión con el servidor.", false);
  }
});
