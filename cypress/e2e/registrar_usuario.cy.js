describe("Registro de usuario", () => {
  beforeEach(() => {
    cy.visit("registrar.html");
  });

  it("registra un usuario correctamente", () => {
    cy.get("#nombre").type("Lucas");
    cy.get("#correo").type("lucas@mail.com");
    cy.get("#contrasena").type("12345");
    cy.get("#telefono").type("77777777");
    cy.get("#fechaNacimiento").type("2000-01-01");

    cy.get("#formRegistro").submit();
    cy.get("#mensaje").should("contain", "Usuario registrado correctamente.");
  });

  it("muestra mensaje de error si falta algún campo", () => {
    cy.get("#nombre").type("Lucas");
    cy.get("#correo").type("lucas@mail.com");
    // dejar campos vacíos
    cy.get("#formRegistro").submit();
    cy.get("#mensaje").should("contain", "Por favor, completa todos los campos.");
  });
});
