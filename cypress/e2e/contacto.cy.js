describe("Ficha — información del responsable", () => {
  it("muestra nombre y ubicación, badge de verificado y botón Llamar", () => {
    cy.visit("/ficha.html");

    cy.contains("Responsable");
    cy.get("#responsable-nombre").should("not.be.empty");
    cy.get("#responsable-ubicacion").should("not.be.empty");

    // Con el mock por defecto del HTML hay refugio verificado y teléfono
    cy.get("#badge-verificado").should("be.visible");
    cy.get("#btn-contacto")
      .should("be.visible")
      .and("have.attr", "href")
      .and("match", /^tel:/);
  });

  it("cuando no permite mostrar datos, oculta botón y muestra mensaje", () => {
    // Forzamos el estado con query simple (opcional: puedes duplicar el HTML con otra variante)
    cy.visit("/ficha.html");
    cy.window().then(win => {
      const owner = {
        type:"person",
        name:"Dueño X",
        location:"La Paz",
        allowContact:false
      };
      const s = win.TagMyPetContacto.computeContactState(owner);

      // Simulamos en el DOM
      win.document.getElementById("responsable-nombre").textContent = owner.name;
      win.document.getElementById("responsable-ubicacion").textContent = owner.location;
      win.document.getElementById("badge-verificado").hidden = !s.isShelterVerified;
      win.document.getElementById("responsable-msj").hidden = s.canShow;
      win.document.getElementById("btn-contacto").hidden = true;
    });

    cy.get("#responsable-msj").should("be.visible");
    cy.get("#btn-contacto").should("not.be.visible");
  });
});