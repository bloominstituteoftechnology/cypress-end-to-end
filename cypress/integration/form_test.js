describe("Form - testing our form inputs", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });
    it("add text to inputs and submit form", function () {
        cy.get('[data-cy="name"]').type("Emily").should("have.value", "Emily");
        cy.get('[data-cy="email"]')
            .type("test@gmail.com")
            .should("have.value", "test@gmail.com");
    });
});