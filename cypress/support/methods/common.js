export const visitDemoHtml = () => {
    cy.visit('/demo.html')
    jQueryBypass()
};

export const jQueryBypass = () => {
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('jQuery is not defined')) {
            return false
        }
    })
};

export const visitSelenium = () => {
    cy.fixture('url').then((data) => {
        cy.visit(data.seleniumTutorial);
    });
};

export const visitGetnada = () => {
    cy.fixture('url').then((data) => {
        cy.visit(data.getnada);
    });
};