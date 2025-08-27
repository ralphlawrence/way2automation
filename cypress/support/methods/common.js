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