import { normalizePet, renderPetCardHTML } from './petCard';

describe('PetCard', () => {
  test('foto faltante -> "Foto no disponible."', () => {
    const html = renderPetCardHTML({ nombre:'Luna', raza:'Mestizo', edad:3, estado:'En adopción', fotoUrl:null });
    expect(html).toContain('Foto no disponible.');
  });

  test('dato faltante -> "Información no disponible."', () => {
    const html = renderPetCardHTML({ nombre:'', raza:null, edad:undefined, estado:'', fotoUrl:null });
    ['nombre','raza','edad','estado'].forEach(id => {
      expect(html).toContain(`data-testid="${id}">Información no disponible.`);
    });
  });

  test('muestra los 4 campos cuando existen', () => {
    const html = renderPetCardHTML({ nombre:'Luna', raza:'Mestizo', edad:3, estado:'En adopción', fotoUrl:'https://x/y.jpg' });
    expect(html).toContain('data-testid="foto"');
    expect(html).toContain('>Luna<');
    expect(html).toContain('>Mestizo<');
    expect(html).toContain('>3<');
    expect(html).toContain('>En adopción<');
  });
});
