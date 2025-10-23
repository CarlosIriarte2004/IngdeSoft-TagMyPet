// cypress/e2e/pet_details.cy.js
describe('HU 1.5 - Ficha pública de mascota', () => {
  it('muestra nombre, raza, edad, estado y placeholder de foto', () => {
    cy.intercept('GET', '**/api/pets/123', {
      statusCode: 200,
      body: {
        id: '123',
        nombre: 'Luna',
        raza: 'Mestizo',
        edad: 3,
        estado: 'En adopción',
        fotoUrl: null
      }
    }).as('getPet');

    cy.visit('/');          // ✅ gracias a baseUrl no necesitas http://...
    cy.wait('@getPet');

    cy.get('[data-testid="nombre"]').should('contain', 'Luna');
    cy.get('[data-testid="raza"]').should('contain', 'Mestizo');
    cy.get('[data-testid="edad"]').should('contain', '3');
    cy.get('[data-testid="estado"]').should('contain', 'En adopción');
    cy.get('[data-testid="foto-placeholder"]').should('contain', 'Foto no disponible.');
  });

  it('faltantes -> "Información no disponible."', () => {
    cy.intercept('GET', '**/api/pets/123', {
      statusCode: 200,
      body: {
        id: '123',
        nombre: '',
        raza: null,
        edad: undefined,
        estado: '',
        fotoUrl: null
      }
    }).as('getPet2');

    cy.visit('/');          // ✅ ruta relativa
    cy.wait('@getPet2');

    ['nombre','raza','edad','estado'].forEach((id) => {
      cy.get(`[data-testid="${id}"]`).should('contain', 'Información no disponible.');
    });
  });
});
