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
        const categories = {};

        actionCategories().each(($section) => {
            const categoryName = $section.find('h1').text().trim().toLowerCase();

            const actions = [];
            cy.wrap($section)
                .find('ul li a')
                .each(($action) => {
                    actions.push($action.text().trim().toLowerCase());
                })
                .then(() => {
                    categories[categoryName] = actions;
                });
        })
            .then(() => {
                // Save to cypress/fixtures/actionNames.json
                cy.writeFile('cypress/fixtures/actionNames.json', categories, { flag: 'w' });
                // Log of categories
                cy.log(JSON.stringify(categories, null, 2));
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
                    cy.assertBtnVisibility(LifetimeMember.regiForm)

                    // Click the [EXPLORE LIFETIME MEMBERSHIP LINK] event
                    cy.clickVisibleElement(LifetimeMember.exploreBtn);
                });
            });
    });
});

describe('Lifetime Membership Registration', () => {
    it('Should fill out the registration form by using an email from getnada.com', () => {
        visitGetnada();

        cy.forceClickVisibleBtn(getnada.getInboxBtn);
        cy.clickVisibleElement(getnada.getChooseForMeBtn);
        cy.wait(4000);

        cy.assertBtnVisibility(getnada.getTempEmail);
        getnada.getTempEmail()
            .invoke('text')
            .then((emailText) => {
                const tempEmail = emailText.trim();
                cy.log(`Used Getnada email: ${tempEmail}`);

                cy.fixture('registrationTestData').then((data) => {
                    cy.visit('/way2auto_jquery/index.php');
                    cy.clickVisibleElement(RegistrationPage.regiForm);

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
            cy.verifyUrl(url.seleniumTutorial);
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