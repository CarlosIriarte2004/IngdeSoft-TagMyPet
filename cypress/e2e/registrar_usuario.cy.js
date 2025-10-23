describe("Registro de usuario", () => {
  beforeEach(() => {
    cy.visit("registrar_usuario.html");
  });

  it("muestra mensaje de error si falta algún campo", () => {
    cy.get("#nombre").type("Lucas");
    cy.get("#correo").type("lucas@mail.com");
    // Dejamos los demás vacíos
    cy.get("#formRegistro").submit();

    cy.get("#mensaje")
      .should("be.visible")
      .and("contain", "Por favor, completa todos los campos.");
  });
});
