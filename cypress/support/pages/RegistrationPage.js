export const RegistrationPage = {
    name: () => {
        return cy.get('input[name="name"]')
    },
    phone: () => {
        return cy.get('input[name="phone"]')
    },
    email: () => {
        return cy.get('input[name="email"]')
    },
    country: () => {
        return cy.get('select[name="country"]')
    },
    city: () => {
        return cy.get('input[name="city"]')
    },
    username: () => {
        return cy.get('input[name="username"]').eq(1)
    },
    password: () => {
        return cy.get('input[name="password"]').eq(1)
    },
    submit: () => {
        return cy.contains('input[type="submit"]', 'Submit')
    },
    lifetimeMemberBtn: () => {
        return cy.contains('a.fancybox', 'EXPLORE LIFETIME MEMBERSHIP')
    },
    regiForm: () => cy.get('#load_box')
};

