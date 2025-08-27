export const registrationForm = () => {
    return cy.get('#load_box');
};

export const formField = {
    name: () => cy.get('input[name="name"]'),
    phone: () => cy.get('input[name="phone"]'),
    email: () => cy.get('input[name="email"]'),
    country: () => cy.get('select[name="country"]'),
    city: () => cy.get('input[name="city"]'),
    username: () => cy.get('input[name="username"]').last(),
    password: () => cy.get('input[name="password"]').last(),
    submit: () => cy.get('input[type="submit"]').last()
}