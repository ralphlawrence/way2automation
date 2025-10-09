import { visitDemoHtml, visitGetnada, visitSelenium, visitRegistration } from "../support/methods/common";
import { actionCategories, dynamicComponents } from "../support/pages/LandingPage";
import { getnada } from "../support/pages/InboxPage";
import { LifetimeMember } from "../support/pages/LifetimeMembership";
import { fillRegiForm } from "../support/methods/registrationForm";
import { RegistrationPage } from "../support/pages/RegistrationPage";
import { clickUntilVisible, clickGetStarted } from "../support/methods/Slider";
import { searchCourse, clickStartButton, selectPayment, clickEnrollButton } from "../support/methods/selenium";
import { Selenium, Cucumber } from "../support/pages/SeleniumPage";

describe('Way2Automation Demo Site Testing', () => {
    beforeEach(() => {
        visitDemoHtml();
    });

    it('Should navigate to the way2automation demo web page', () => {
        cy.contains('Test your Selenium / QTP Scripts').should('be.visible')
    });

    it('Should extract and list action names by category', () => {
        // Get all action categories from the landing page
        actionCategories().then($sections => {
            const actionMap = {};

            // Iterate through each section to extract category and actions
            Cypress._.each($sections, section => {
                const $section = Cypress.$(section);
                const category = $section.find('h1').text().trim().toLowerCase();
                const actions = $section.find('ul li a')
                    .map((_, el) => Cypress.$(el).text().trim().toLowerCase())
                    .get();
                actionMap[category] = actions;
            });

            // Save the extracted categories and actions to a fixture file
            cy.writeFile('cypress/fixtures/actionNames.json', actionMap, { flag: 'w' });

            // Log the result for debugging
            cy.log('Extracted action categories:');
            cy.log(JSON.stringify(actionMap, null, 2));
        });
    });

    it('Should retrieve target URL for [Submit Button Clicked]', () => {
        dynamicComponents.submitBtn()
            .should('exist')
            .should('have.attr', 'href')
            .then((href) => {
                const targetUrl = href;
                // URL retrieved in [Submit Button Clicked] event within "Dynamic Elements" category
                cy.log('Target URL:', targetUrl);

                // Visit the target URL
                cy.visit(targetUrl, () => {
                    // Assert visibility and click the [EXPLORE LIFETIME MEMBERSHIP LINK] event
                    LifetimeMember.regiForm().should('be.visible');
                    LifetimeMember.exploreBtn().should('be.visible').click();
                });
            });
    });
});

describe('Lifetime Membership Registration', () => {
    it('Should fill out the registration form by using an email from getnada.com', () => {
        visitGetnada();

        getnada.getInboxBtn().should('be.visible').click({ force: true });
        getnada.getChooseForMeBtn().should('be.visible').click();
        getnada.getTempEmail().should('be.visible', {timeout: 4000});
        getnada.getTempEmail()
            .invoke('text')
            .then((emailText) => {
                const tempEmail = emailText.trim();
                cy.log(`Used Getnada email: ${tempEmail}`);

                cy.fixture('registrationTestData').then((data) => {
                    cy.visit('/way2auto_jquery/index.php');
                    RegistrationPage.regiForm().should('be.visible').click();

                    fillRegiForm(data, tempEmail);
                });
            });
    });
});

describe('Lifetime Membership Course Flow', () => {
    beforeEach(() => {
        visitRegistration();
        RegistrationPage.lifetimeMemberBtn()
            .then(($a) => {
                const newUrl = $a.prop('href');
                cy.visit(newUrl);
            });
    });

    it('Should display "30+ Courses video library FREE ACCESS"', () => {

        cy.get('h2', { timeout: 10000 })
            .contains('30+ Courses video library FREE ACCESS')
            .scrollIntoView()
            .should('be.visible');

        LifetimeMember.slider().should('be.visible');
    });

    it('Should navigate to Automation Architect course', () => {
        clickUntilVisible("Automation Architect Selenium with 7 live projects");

        // Click Get started [button]
        clickGetStarted();

        // Verify URL
        cy.fixture('url').then((url) => {
            cy.url().should('eq', url.seleniumTutorial);
        });
        cy.reload();
    });

});

describe('Automation Architecture Selenium page test flow', () => {
    beforeEach(() => {
        visitSelenium();
    });

    it('Should find the course "CucumberParallelWithPageObjects - Project Code" and click [Start]', () => {
        Selenium.course().should('exist');
        cy.fixture('selenium').then((data) => {
            const cucumberCourse = data.course[0].cucumber;
            cy.log(`Looking for course: ${cucumberCourse}`);

            searchCourse(cucumberCourse).then((location) => {
                clickStartButton(cucumberCourse, location);
            });

            // Wait for page to Load. Asserting the lecture heading to make sure it loads the right page
            Cucumber.lectureHeading(cucumberCourse).should('be.visible');
        });
    });

    it('Should allow payment selection', () => {
        selectPayment('USD');
    });

    it('Should enroll in the course', () => {
        clickEnrollButton();
    });
});