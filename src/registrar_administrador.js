// Clave en localStorage
export const ADMINS_KEY = 'admins';

// --- Validación mínima ---
export function validar({ nombre, email, password, confirm }) {
  if (!nombre?.trim()) return 'El nombre es obligatorio.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')) return 'El correo no es válido.';
  if (!password || password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (password !== confirm) return 'Las contraseñas no coinciden.';
  return '';
}

// --- Guardado ---
export function getAdmins(storage = window?.localStorage) {
  try { return JSON.parse(storage.getItem(ADMINS_KEY) || '[]'); } catch { return []; }
}
export function setAdmins(list, storage = window?.localStorage) {
  storage.setItem(ADMINS_KEY, JSON.stringify(list));
}
export function existeEmail(email, storage = window?.localStorage) {
  return getAdmins(storage).some(a => a.email.toLowerCase() === String(email).toLowerCase());
}
export function crearAdmin({ nombre, email, password, codigo = '' }, storage = window?.localStorage) {
  if (existeEmail(email, storage)) return { ok:false, error:'Ya existe un administrador con ese correo.' };
  const admin = {
    id: (typeof crypto!=='undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(),
    nombre: nombre.trim(), email: email.trim(), password, codigo: String(codigo), rol:'admin', ts: Date.now()
  };
  const list = getAdmins(storage); list.push(admin); setAdmins(list, storage);
  return { ok:true, admin };
}

// --- Hook al formulario (solo navegador) ---
if (typeof document !== 'undefined') {
  const form = document.getElementById('form-admin');
  if (form) {
    const $msg = document.getElementById('mensaje');
    const $ok  = document.getElementById('ok');
    form.addEventListener('submit', (e)=>{
      e.preventDefault(); $msg.style.display='none'; $ok.style.display='none'; $msg.textContent='';
      const data = {
        nombre: form.nombre.value, email: form.email.value,
        password: form.password.value, confirm: form.confirm.value,
        codigo: form.codigo.value
      };
      const ve = validar(data);
      if (ve){ $msg.textContent = ve; $msg.style.display='block'; return; }
      const res = crearAdmin(data);
      if (!res.ok){ $msg.textContent = res.error; $msg.style.display='block'; return; }
      $ok.style.display='block'; form.reset();
    });
  }
}
