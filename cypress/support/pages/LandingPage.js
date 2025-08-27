/*Dynamic Components */
export const dynamicComponents = {
    submitBtn: () =>
        cy.contains('a', 'Submit Button Clicked'),
    dropDown: () =>
        cy.get(':nth-child(4) > .boxed_style > :nth-child(2)')
}
