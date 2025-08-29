# Way2Automation Cypress Automation

This repository contains **Cypress automated tests** for the
[Way2Automation Demo Site](https://www.way2automation.com/demo.html).\
It validates core flows such as registration, membership navigation,
course access, and payment selection.

------------------------------------------------------------------------

## 🚀 Features

-   Automated navigation of demo site categories
-   Registration form automation with **Getnada temp email**
-   Lifetime Membership flow validation
-   Selenium Tutorial course navigation
-   Payment method selection and price validation
-   JSON extraction of action categories from demo page
-   Reusable **Page Object Model (POM)** structure
-   **Mochawesome reports** and screenshots on failures

------------------------------------------------------------------------

## 📂 Project Structure

    cypress/
     ├── e2e/              # Test specs
     ├── fixtures/         # Test data (urls, courses, payments)
     ├── reports/          # Mochawesome HTML/JSON reports (headless runs)
     ├── screenshots/      # Screenshots auto-saved on test failure
     └── support/
         ├── pages/        # Page Object Models
         ├── methods/      # Helper functions
         └── commands.js   # Custom Cypress commands
------------------------------------------------------------------------

## 🧪 Example Tests

-   Verify page loads successfully
-   Extract category actions into JSON
-   Fill registration with generated email
-   Navigate carousel → specific course → click Start
-   Validate payment selection (USD/INR)
-   Assert "Enroll in Course" → "Processing..." transition

------------------------------------------------------------------------

## ⚙️ Setup & Run

``` bash
# Install dependencies
npm install

# Open Cypress GUI
npx cypress open

# Run headless
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/integration/seleniumFlow.spec.js"
```

------------------------------------------------------------------------

## 📌 Notes

-   Uses **Cypress v11** with **Page Object Model** design
-   External CAPTCHAs (e.g., Teachable checkout) cannot be bypassed
-   Test data stored in `cypress/fixtures/`

------------------------------------------------------------------------

## 👨‍💻 Author

**Ralph Lawrence Tarlac**\
QA Automation Engineer
