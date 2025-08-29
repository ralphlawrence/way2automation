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

const visitPage = (pageKey) => {
    cy.fixture('url').then((data) => {
        if (!data[pageKey]) {
            throw new Error(`Page key "${pageKey}" not found in url.json`);
        }
        cy.visit(data[pageKey]);
    });
};

export const visitSelenium = () => visitPage('seleniumTutorial');
export const visitGetnada = () => visitPage('getnada');
export const visitRegistration = () => visitPage('registration');