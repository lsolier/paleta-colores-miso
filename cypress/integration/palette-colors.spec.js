const url = "https://lsolier.github.io/color-palette/";

context( `Visual Regression Testing under ${Cypress.env('app_name')}`, () => {
    beforeEach(() => {
        cy.log("🚩 Visitando pagina");
        cy.visit(url);
        cy.wait(1000);
    })

    it(`visits ${url} and take screenshots`, function() {        
        cy.screenshot(`${Cypress.env('scrennshot_before')}`);
        cy.wait(1000);
        cy.log("🚩 Click to generate colors - chrome");
        cy.get('#generate').click();
        cy.screenshot(`${Cypress.env('screenshot_after')}`);
        cy.wait(1000);
        cy.log("🚩 Finish");
    })
});
