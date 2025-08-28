export const Selenium = {
    course: () => cy.get('.col-xs-10 > :nth-child(3) > .col-sm-12 > .section-list'),
    hiddenSections: (courseName) =>
        cy.contains('#hidden_sections > > .col-sm-12 > .section-list >', courseName),
    moreLectureBtn: () => cy.get('#more_lecture_sections')
};

export const Cucumber = {
    lectureHeading: (courseName) => cy.contains('#lecture_heading', courseName)
};

export const payment = {
    payinUSDBtn: () => cy.contains('label.btn', 'PAY IN USD'),
    payinIndianCurrencyBtn: () => cy.contains('label.btn', 'PAY IN INDIAN CURRENCY'),
    price_USD: () => cy.get('.default-product-price.product_4632690'),
    price_IndianCurrency: () => cy.get('.default-product-price.product_4632691')
};