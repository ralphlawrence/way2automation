export const getnada = {
    getInboxBtn: () => {
        return cy.contains('.flex-row > .font-medium', 'Get my first inbox!');
    },
    getChooseForMeBtn: () => {
        return cy.contains('.flex-wrap > :nth-child(2) > .text-center', 'Choose for me');
    },
    getTempEmail: () => {
        return cy.get('.text-2xl > .text-indigo-600');
    }
}