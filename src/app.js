import { renderPetCardHTML } from './petCard';

// Si no defines env, usará http://localhost:4000 (json-server)
const API_URL = process.env.VITE_API_URL || 'http://localhost:4000';

async function loadPet(id = '123') {
  const res = await fetch(`${API_URL}/api/pets/${id}`);
  if (!res.ok) throw new Error('No se pudo cargar la mascota');
  return res.json();
}

async function mount() {
  const root = document.getElementById('app');
  root.innerHTML = '<div>Cargando...</div>';
  try {
    const pet = await loadPet('123');
    root.innerHTML = renderPetCardHTML(pet);
  } catch (e) {
    console.error(e);
    root.innerHTML = '<div>Error cargando datos</div>';
  }
}

mount();
