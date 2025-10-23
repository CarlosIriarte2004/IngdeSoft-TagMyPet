export function normalizePet(pet = {}) {
  const safe = (v) => (v === null || v === undefined || v === '' ? 'Información no disponible.' : v);
  return {
    nombre: safe(pet.nombre),
    raza: safe(pet.raza),
    edad: safe(pet.edad),
    estado: safe(pet.estado),
    fotoUrl: pet.fotoUrl || null,
  };
}

export function renderPetCardHTML(raw) {
  const pet = normalizePet(raw);
  const foto = raw?.fotoUrl
    ? `<img src="${raw.fotoUrl}" alt="Foto de ${raw.nombre || 'mascota'}" data-testid="foto"/>`
    : `<div data-testid="foto-placeholder">Foto no disponible.</div>`;

  return `
  <article class="pet-card" data-testid="pet-card">
    <div class="pet-card__foto">${foto}</div>
    <ul class="pet-card__info">
      <li><strong>Nombre:</strong> <span data-testid="nombre">${pet.nombre}</span></li>
      <li><strong>Raza:</strong> <span data-testid="raza">${pet.raza}</span></li>
      <li><strong>Edad:</strong> <span data-testid="edad">${pet.edad}</span></li>
      <li><strong>Estado:</strong> <span data-testid="estado">${pet.estado}</span></li>
    </ul>
  </article>`;
}
