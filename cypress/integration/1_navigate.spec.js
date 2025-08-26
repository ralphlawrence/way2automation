describe('Way2Automation Demo Site', () => {
  beforeEach(() => {
    cy.visit('/')
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('jQuery is not defined')) {
        return false
      }
    })
  });

  it('Navigate to the web page', () => {
    cy.contains('Test your Selenium / QTP Scripts').should('be.visible')
  });
});