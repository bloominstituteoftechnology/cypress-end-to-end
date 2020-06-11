describe("Form - testing our form inputs", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });
    it("add text to inputs and submit form", function () {
        cy.get('[data-cy="name"]').type("Emily").should("have.value", "Emily");
        cy.get('[data-cy="email"]')
            .type("test@gmail.com")
            .should("have.value", "test@gmail.com");
        cy.get("[data-cy=motivation]")
            .type("I want to help")
            .should("have.value", "I want to help");
        cy.get("#positions").select("Yard Work").should("have.value", "Yard Work");
        cy.get('[type="checkbox"]').check().should("be.checked");
        cy.get("[data-cy=submit]").click();