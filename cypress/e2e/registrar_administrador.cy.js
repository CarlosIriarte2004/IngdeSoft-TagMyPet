describe('Registrar administrador (básico)', () => {
  beforeEach(()=> cy.clearLocalStorage());

  it('muestra error con datos vacíos', () => {
    cy.visit('registrar_administrador.html');
    cy.get('[data-testid="submit"]').click();
    cy.get('#mensaje').should('be.visible');
  });

  it('crea un admin válido y lo guarda', () => {
    cy.visit('registrar_administrador.html');
    cy.get('[data-testid="nombre"]').type('Ana Admin');
    cy.get('[data-testid="email"]').type('ana@tagmypet.com');
    cy.get('[data-testid="password"]').type('secret0');
    cy.get('[data-testid="confirm"]').type('secret0');
    cy.get('[data-testid="codigo"]').type('ADM-1');
    cy.get('[data-testid="submit"]').click();
    cy.get('#ok').should('be.visible');
    cy.window().then(w=>{
      const list = JSON.parse(w.localStorage.getItem('admins')||'[]');
      expect(list.some(a=>a.email==='ana@tagmypet.com')).to.be.true;
    });
  });
});
