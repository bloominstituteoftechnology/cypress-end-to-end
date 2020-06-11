describe('Form - testing our form inputs', function ()){
    it('visit our localhost', function ()){
        beforeEach(() => {
            cy.visit('http://localhost:3000');
        });
        it('add text to inputs and submit form', function ({
            cy.get('[data=cy="name"').type("Emily)
        }))

}
}