export const getnada = {
    visit: () => {
        cy.visit('https://inboxes.com/');
    },
    getInboxBtn: () => {
        return cy.contains('Get my first inbox!');
    },
    getChooseForMeBtn: () => {
        return cy.contains('Choose for me');
    },
    createInbox: () => {
        getInboxPage.getInboxBtn().click();
        getInboxPage.getChooseForMeBtn().click();
    },
    getEmail: () => {
        return cy.get('.text-2xl > .text-indigo-600');
    },  
    getTempEmail: () => {
        return cy.get('.text-2xl > .text-indigo-600')
            
    }
}