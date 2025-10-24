import { validar, crearAdmin, getAdmins, ADMINS_KEY } from '../registrar_administrador.js';

const memoryStore = ()=>{ let s={}; return {
  getItem:k=>s[k]??null, setItem:(k,v)=>{s[k]=String(v)}, clear:()=>{s={}}
};};

test('validar detecta errores básicos', ()=>{
  expect(validar({})).toMatch(/nombre/i);
  expect(validar({nombre:'A',email:'mal',password:'123',confirm:'123'})).toMatch(/correo/i);
  expect(validar({nombre:'A',email:'a@a.com',password:'123',confirm:'123'})).toMatch(/6/);
  expect(validar({nombre:'A',email:'a@a.com',password:'123456',confirm:'x'})).toMatch(/no coinciden/i);
});

test('crearAdmin guarda y evita duplicados', ()=>{
  const storage = memoryStore();
  const ok = crearAdmin({nombre:'Ana',email:'a@a.com',password:'123456'}, storage);
  expect(ok.ok).toBe(true);
  const list = JSON.parse(storage.getItem(ADMINS_KEY));
  expect(list).toHaveLength(1);
  const dup = crearAdmin({nombre:'Ana2',email:'a@a.com',password:'123456'}, storage);
  expect(dup.ok).toBe(false);
});

test('getAdmins retorna [] si no hay datos', ()=>{
  const storage = memoryStore();
  expect(getAdmins(storage)).toEqual([]);
});
