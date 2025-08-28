export const RegistrationPage = {
    visit: () => {
        cy.visit('/way2auto_jquery/index.php');
        cy.get('#load_box', { timeout: 8000 }).should('be.visible');
    },
    name: (data) => {
        cy.get('input[name="name"]').type(data.name);
    },
    phone: (data) => {
        cy.get('input[name="phone"]').type(data.phone);
    },
    email: (tempEmail) => {
        cy.get('input[name="email"]').type(tempEmail);
    },
    country: (data) => {
        cy.get('select[name="country"]').select(data.country);
    },
    city: (data) => {
        cy.get('input[name="city"]').type(data.city);
    },
    username: (data) => {
        cy.get('input[name="username"]').eq(1).type(data.username);
    },
    password: (data) => {
        cy.get('input[name="password"]').eq(1).type(data.password);
    },
    submit: () => {
        cy.get('input[type="submit"]').click();
    },
    lifetimeMemberBtn: () => {
        return cy.contains('a.fancybox', 'EXPLORE LIFETIME MEMBERSHIP')
    }
};
