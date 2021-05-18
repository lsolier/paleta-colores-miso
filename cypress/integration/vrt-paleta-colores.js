const compareImages = require("resemblejs/compareImages")
const config = require("../support/conf.json");

const { options } = config;

describe( `Visual Regression Testing under ${config.url}`, function() {

    it(`visits ${config.url} and take screenshots`, async function() {

        let datetime = new Date().toISOString().replace(/:/g,".");

        cy.log("🚩 Visitando pagina");
        cy.visit(config.url);
        cy.wait(1000);
        if (Cypress.isBrowser('chrome')) {
            cy.screenshot(`${datetime}/before-chrome`);
            cy.wait(1000);
            cy.log("🚩 Click to generate colors - chrome");
            cy.get('#generate').click();
            cy.screenshot(`${datetime}/after-chrome`);
            cy.wait(1000);
        }
        cy.log("🚩 Finish");
    })
});
