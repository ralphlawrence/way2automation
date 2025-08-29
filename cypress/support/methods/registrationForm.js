import { RegistrationPage } from "../pages/RegistrationPage";

export const fillRegiForm = (data, tempEmail) => {
    cy.typeVisible(RegistrationPage.name, data.name);
    cy.typeVisible(RegistrationPage.phone, data.phone);
    cy.typeVisible(RegistrationPage.email, tempEmail);
    cy.selectVisibleOption(RegistrationPage.country, data.country);
    cy.typeVisible(RegistrationPage.city, data.city);
    cy.typeVisible(RegistrationPage.username, data.username);
    cy.typeVisible(RegistrationPage.password, data.password);
};
