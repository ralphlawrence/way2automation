import { jQueryBypass } from "../support/methods/common";

describe('List Action Name category', () => {
    beforeEach(() => {
        cy.visit('/demo.html')
        jQueryBypass()
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