import { RegistrationPage } from "../pages/RegistrationPage";

export const fillRegiForm = (data, tempEmail) => {
    RegistrationPage.name().should('be.visible').type(data.name);
    RegistrationPage.phone().should('be.visible').type(data.phone);
    RegistrationPage.email().should('be.visible').type(tempEmail);
    RegistrationPage.country().should('be.visible').select(data.country);
    RegistrationPage.city().should('be.visible').type(data.city);
    RegistrationPage.username().should('be.visible').type(data.username);
    RegistrationPage.password().should('be.visible').type(data.password);
};
