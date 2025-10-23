describe("Registro de mascota (Datos básicos)", () => {
  beforeEach(() => {
    // Asegúrate de tener Parcel sirviendo registro.html en este puerto
    // npx parcel registro.html  (o npm start si agregaste varias páginas)
    cy.visit("http://localhost:1234/registro.html");
    // Verificamos que realmente estemos en la página correcta
    cy.contains("Registrar Nueva Mascota").should("be.visible");
  });

  it("muestra error si faltan campos obligatorios", () => {
    cy.get("#formRegistroMascota").within(() => {
      cy.get("#nombre").type("Lucky");
      cy.get("#edad").type("3");
      // especie vacía a propósito
      cy.get("#raza").type("Golden");
      cy.root().submit();
    });
    cy.contains("Complete todos los campos requeridos.").should("be.visible");
  });

  it("registra la mascota exitosamente y la muestra en la lista", () => {
    // ⚠️ En Cypress, la foto NO es obligatoria (gracias al flag en registro.js)
    cy.get("#formRegistroMascota").within(() => {
      cy.get("#nombre").type("Lucky");
      cy.get("#edad").type("3");
      cy.get("#especie").select("Perro");
      cy.get("#raza").type("Golden Retriever");
      // No adjuntamos #foto a propósito
      cy.root().submit();
    });

    // Mensaje de éxito y render de la lista
    cy.contains("Mascota registrada exitosamente.").should("be.visible");
    cy.get("#listaMascotas")
      .should("contain.text", "Lucky")
      .and("contain.text", "Perro")
      .and("contain.text", "Golden Retriever")
      .and("contain.text", "3 años");
  });
});
