// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('typeVisible', (elementFn, text) => {
    elementFn().should('be.visible').type(text);
});

Cypress.Commands.add('selectVisibleOption', (elementFn, optionText) => {
    elementFn().should('be.visible').select(optionText);
});

Cypress.Commands.add('forceClickVisibleBtn', (elementFn) => {
    elementFn().should('be.visible').click({ force: true });
});

Cypress.Commands.add('clickVisibleElement', (elementFn) => {
    elementFn().should('be.visible').click({});
});

Cypress.Commands.add('assertBtnVisibility', (elementFn) => {
    elementFn().should('be.visible');
});

Cypress.Commands.add('verifyUrl', (expectedUrl) => {
    cy.url().should('eq', expectedUrl);
});