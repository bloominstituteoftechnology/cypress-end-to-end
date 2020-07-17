describe("form test", () => {
    it("test the from is working", () => {
        cy.visit("/")

        cy.get("[for="name"] > input")
        .type
    })
})