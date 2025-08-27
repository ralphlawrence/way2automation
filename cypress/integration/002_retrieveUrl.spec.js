import { visitDemoHtml } from "../support/methods/common";
import { getnada } from "../support/pages/InboxPage";
import { dynamicComponents } from "../support/pages/LandingPage";
import { RegistrationPage } from "../support/pages/RegistrationPage";

describe('Retrieve and Visit URL, Fill out Registration Form and Click [EXPLORE LIFETIME MEMBERSHIP LINK]', () => {

    it('should click the [EXPLORE LIFETIME MEMBERSHIP LINK]', () => {
        visitDemoHtml();
        dynamicComponents.submitBtn()
            .should('exist')
            .should('have.attr', 'href')
            .then((href) => {
                const targetUrl = href;
                /**URL retrieved in [Submit Button Clicked] event */
                cy.log('Target URL:', targetUrl);

                /** Visit the target URL */
                cy.origin(targetUrl, () => {
                    cy.visit('/');
                    cy.get('#load_box').should('be.visible');

                    /**Click the [EXPLORE LIFETIME MEMBERSHIP LINK] event */
                    cy.contains('a.fancybox', 'EXPLORE LIFETIME MEMBERSHIP')
                        .click({ force: true });
                });
            });
    });

    it('should fill out the dummy registration form by using an email from getnada.com', () => {
        getnada.visit();
        getnada.getInboxBtn().click();
        getnada.getChooseForMeBtn().click();
        cy.wait(5000);

        getnada.getTempEmail()
            .invoke('text')
            .then((emailText) => {
                const tempEmail = emailText.trim();
                cy.log(`Used Getnada email: ${tempEmail}`);

                cy.origin(
                    'https://way2automation.com',
                    { args: { tempEmail } }, (args) => {
                        const { tempEmail } = args;
                        cy.fixture('registrationTestData').then((data) => {

                            cy.visit('/way2auto_jquery/index.php');
                            cy.get('#load_box', { timeout: 8000 }).should('be.visible');

                            /** Fill out the registration form */
                            cy.get('input[name="name"]').type(data.name);
                            cy.get('input[name="phone"]').type(data.phone);
                            cy.get('input[name="email"]').type(tempEmail);
                            cy.get('select[name="country"]').select(data.country);
                            cy.get('input[name="city"]').type(data.city);
                            cy.get('input[name="username"]').eq(1).type(data.username);
                            cy.get('input[name="password"]').eq(1).type(data.password);
                        });
                    }
                );
            });
    });

    it.only('should be able to scroll into "30+ Courses video library FREE ACCESS"', () => {
        RegistrationPage.visit();

        cy.contains('a.fancybox', 'EXPLORE LIFETIME MEMBERSHIP')
            .then(($a) => {
                const newUrl = $a.prop('href');
                cy.origin(new URL(newUrl).origin, { args: { newUrl } }, ({ newUrl }) => {
                    cy.visit(newUrl); // go straight to the link's page
                    cy.get('h2', { timeout: 10000 })
                        .contains('30+ Courses video library FREE ACCESS')
                        .scrollIntoView();
                });
            });
    });
});