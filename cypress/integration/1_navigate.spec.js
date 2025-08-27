import { jQueryBypass } from "../support/methods/common";

describe('Way2Automation Demo Site', () => {
  it('Navigate to the web page', () => {
    cy.fixture('actionNames').as('actionNames')
    cy.visit('/demo.html')
    jQueryBypass()
    cy.contains('Test your Selenium / QTP Scripts').should('be.visible')
  });
});