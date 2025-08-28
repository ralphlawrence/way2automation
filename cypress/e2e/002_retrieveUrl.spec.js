import { visitDemoHtml, visitSelenium } from "../support/methods/common";
import { clickUntilVisible, clickGetStarted } from "../support/methods/Slider";
import { getnada } from "../support/pages/InboxPage";
import { dynamicComponents } from "../support/pages/LandingPage";
import { LifetimeMember } from "../support/pages/lifetimeMembership";
import { RegistrationPage } from "../support/pages/RegistrationPage";
import { searchCourse, verifyUrl, clickStartButton, selectPayment } from "../support/methods/selenium";
import { Selenium, Cucumber } from "../support/pages/SeleniumPage";

describe('Retrieve and Visit URL, Fill out Registration Form and Click [EXPLORE LIFETIME MEMBERSHIP LINK]', () => {
    beforeEach(() => {
        cy.fixture('url').as('url');
    });

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
                cy.visit(targetUrl, () => {
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

    it('should be able to scroll into "30+ Courses video library FREE ACCESS"', () => {
        RegistrationPage.visit();
        RegistrationPage.lifetimeMemberBtn()
            .then(($a) => {
                const newUrl = $a.prop('href');
                cy.visit(newUrl); // Direct visit, no cy.origin needed

                cy.get('h2', { timeout: 10000 })
                    .contains('30+ Courses video library FREE ACCESS')
                    .scrollIntoView()
                    .should('be.visible');
            });

        LifetimeMember.slider().should('be.visible');
        /**Navigate to "Automation Architect Selenium with 7 live projects" */
        clickUntilVisible("Automation Architect Selenium with 7 live projects");

        /**Click on the [Get Started] button */
        clickGetStarted();

        /** Verify that the URL page is equal to 
        "https://www.seleniumtutorial.com/p/automation-architect-in-selenium-7-live-projects".*/
        cy.fixture('url').then((url) => {
            verifyUrl(url.seleniumTutorial);
        });


    });

    it.only('should be able to visit selenium automation course', () => {
        visitSelenium();

        /**Find the course "CucumberParallelWithPageObjects - Project Code", then click 'Start' button */
        Selenium.course().should('exist');
        cy.fixture('selenium').then((data) => {
            const cucumberCourse = data.course[0].cucumber;
            cy.log(`Looking for course: ${cucumberCourse}`);

            searchCourse(cucumberCourse).then((location) => {
                clickStartButton(cucumberCourse, location);
            });

            /** Wait for page to Load. Asserting the lecture heading to make sure it loads the right page */
            Cucumber.lectureHeading(cucumberCourse).should('be.visible');
        });

        /**Navigate back to Selenium Tutorial site*/
        visitSelenium();

        /** Select Payment Method and assert the payment amount*/
        selectPayment('USD');
    });

});