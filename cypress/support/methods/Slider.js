import { LifetimeMember } from "../pages/lifetimeMembership";

export const clickUntilVisible = (text, maxTries = 30) => {
    LifetimeMember.nextBtn().click();

    let tries = 0;

    const checkSlide = () => {
        LifetimeMember.activeSlide().then(($slide) => {
            if ($slide.text().includes(text)) {
                cy.log(`Found slide: "${text}"`);
            } else if (tries < maxTries) {
                tries++;
                LifetimeMember.prevBtn().click();
                cy.wait(400);
                checkSlide();
            } else {
                throw new Error(`Slide with text "${text}" not found after ${maxTries} attempts`);
            }
        });
    };
    checkSlide();
};

export const clickGetStarted = () => {
    LifetimeMember.activeSlide()
        .contains('Get Started')
        .click();
};