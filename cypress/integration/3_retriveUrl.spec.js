import { dynamicElements } from "../support/cmpnts/actionNames";
import { jQueryBypass } from "../support/methods/common";

describe('Retrieve and Visit URL, Fill out Registration Form and Click [EXPLORE LIFETIME MEMBERSHIP LINK]', () => {

    it.only('should click the [EXPLORE LIFETIME MEMBERSHIP LINK]', () => {
        cy.visit('/demo.html');
        jQueryBypass();
        dynamicElements.submitBtn()
            .should('exist')
            .should('have.attr', 'href')
            .then((href) => {
                const targetUrl = href;
                /**URL retrieved in [Submit Button Clicked] event */
                cy.log('Target URL:', targetUrl);
                expect(targetUrl).to.eq('http://www.qa.way2automation.com');

                /** Visit the target URL */
                cy.origin(targetUrl, () => {
                    cy.visit('/');
                    cy.get('#load_box').should('be.visible');
                    /**Click the [EXPLORE LIFETIME MEMBERSHIP LINK] event */
                    cy.contains('a.fancybox', 'EXPLORE LIFETIME MEMBERSHIP')
                        .click({ force: true });

                    /**Scroll to "30+ Courses video library FREE ACCESS" */
                    cy.url().then((newUrl) => {
                        cy.log(newUrl)
                        cy.origin(newUrl, () => {
                            cy.get('h2')
                                .contains('30+ Courses video library FREE ACCESS', { timeout: 10000 })
                                .scrollIntoView();
                        });
                    });
                });
            });
    });

    it('should fill out the dummy registration form by using an email from getnada.com', () => {
        cy.visit('https://inboxes.com/');
        cy.contains('Get my first inbox!').click();
        cy.contains('Choose for me').click();
        cy.wait(5000);

        cy.get('.text-2xl > .text-indigo-600')
            .invoke('text')
            .then((emailText) => {
                const tempEmail = emailText.trim();
                cy.log(`Used Getnada email: ${tempEmail}`);

                cy.origin(
                    'https://way2automation.com',
                    { args: { tempEmail } },
                    (args) => {
                        const { tempEmail } = args;

                        cy.visit('/way2auto_jquery/index.php');
                        cy.get('#load_box', { timeout: 8000 }).should('be.visible');

                        cy.get('input[name="name"]').type('Ralph QA');
                        cy.get('input[name="phone"]').type('09171234567');
                        cy.get('input[name="email"]').type(tempEmail);
                        cy.get('select[name="country"]').select('Philippines');
                        cy.get('input[name="city"]').type('Caloocan');
                        cy.get('input[name="username"]').eq(1).type('ralph123');
                        cy.get('input[name="password"]').eq(1).type('SecurePass123!');
                    }
                );
            });
    });
});