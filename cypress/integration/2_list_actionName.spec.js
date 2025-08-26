describe('List Action Name category', () => {
    beforeEach(() => {
        cy.visit('/')
        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes('jQuery is not defined')) {
                return false
            }
        })
        cy.fixture('actionNames').as('actionNames')
    });

    it('should validate presence of each action button', function () {
        Object.entries(this.actionNames).forEach(([category, actions]) => {
            cy.log(`Checking category: ${category}`)
            actions.forEach((action) => {
                cy.contains(action, { matchCase: false })
                    .should('exist')
            })
        })
    })
})