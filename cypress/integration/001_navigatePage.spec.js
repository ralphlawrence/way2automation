import { visitDemoHtml } from "../support/methods/common";

describe('Way2Automation Demo Site', () => {
  it('Navigate to the web page', () => {
    cy.fixture('actionNames').as('actionNames')
    visitDemoHtml();
    cy.contains('Test your Selenium / QTP Scripts').should('be.visible')
  });

});

describe('List Action Name category', () => {
  beforeEach(() => {
    visitDemoHtml();
    cy.fixture('actionNames').as('actionNames')
  });

  it('should validate presence of each action name', function () {
    Object.entries(this.actionNames).forEach(([category, actions]) => {
      cy.log(`Checking category: ${category}`)
      actions.forEach((action) => {
        cy.contains(action, { matchCase: false })
          .should('exist')
      })
    })
  })
})