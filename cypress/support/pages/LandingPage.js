/**Landing Page components */

export const actionCategories = () => {
    return cy.get('.linkbox.margin-bottom-20')
};

/*Dynamic Components */
export const dynamicComponents = {
    submitBtn: () =>
        cy.contains('a', 'Submit Button Clicked'),
    dropDown: () =>
        cy.get(':nth-child(4) > .boxed_style > :nth-child(2)')
};