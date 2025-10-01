import { Selenium, payment } from "../pages/SeleniumPage";

export const searchCourse = (courseName, maxTries = 10) => {
    let tries = 0;

    return new Cypress.Promise((resolve, reject) => {
        const checkCourse = () => {
            Selenium.course().then(($el) => {
                if ($el.text().includes(courseName)) {
                    cy.contains(courseName)
                        .should('be.visible')
                        .then(() => {
                            cy.log(`Course "${courseName}" found in visible section`);
                            resolve('visible');
                        });
                } else if (tries < maxTries) {
                    tries++;
                    cy.log(`Course not visible yet. Clicking "More lectures"... (try ${tries})`);
                    Selenium.moreLectureBtn().click({ force: true });
                    cy.wait(500);

                    cy.contains(courseName).should('be.visible').then(() => {
                        cy.log(`Course "${courseName}" found in hidden section`);
                        resolve('hidden');
                    });
                } else {
                    reject(new Error(`Course "${courseName}" not found after ${maxTries} attempts`));
                }
            });
        };

        checkCourse();
    });
};

export const clickStartButton = (courseName, location) => {
    if (location === 'visible') {
        Selenium.course().contains(courseName).parent().contains('Start').click();
    } else if (location === 'hidden') {
        Selenium.hiddenSections(courseName).contains('Start').click();
    } else {
        throw new Error(`Unknown course location: ${location}`);
    }
};

export const selectPayment = (currency) => {
    cy.fixture('selenium').then(({ prices }) => {
        switch (currency) {
            case 'USD':
                payment.payinUSDBtn().click();
                payment.price_USD().should('have.text', prices.USD);
                break;
            case 'INR':
                payment.payinIndianCurrencyBtn().click();
                payment.price_IndianCurrency().should('have.text', prices.INR);
                break;
            default:
                throw new Error(`Unsupported currency: ${currency}`);
        }
    });
};

export const clickEnrollButton = () => {
    cy.fixture('selenium').then((data) => {
        const { enroll } = data;

        payment.enrollBtn().invoke('text').should('include', enroll.beforeClick);
        payment.enrollBtn().should('be.visible').click();
        payment.enrollBtn().invoke('text').should('include', enroll.afterClick);
    });
};
