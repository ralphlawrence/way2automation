# Way2Automation Cypress Automation -- Documentation

This documentation explains the design, implementation, and execution of
the automated test scripts for the **Way2Automation Demo Site**.

------------------------------------------------------------------------

## 1. Objective

To validate the **Way2Automation demo site flows** through Cypress
automated testing.

------------------------------------------------------------------------

## 2. Tools & Framework

-   **Cypress v11** -- test automation framework (updated from Cypress 9* to Cypress v11** with the knowledge of the talent acquisition) 
-   **Mocha** -- test runner
-   **Node.js v16.14**
-   **Custom Commands** -- reusable helper functions
-   **Page Object Model (POM)** -- for scalability and readability

------------------------------------------------------------------------

## Project Structure

```plaintext
cypress/
 ├── e2e/
 │   └── way2Automation.spec.js     # Demo site automation
 │
 ├── fixtures/
 │   ├── url.json                   # Stores URLs
 │   ├── selenium.json              # Selenium test data
 │   ├── registrationTestData.json  # Registration form test data
 │   └── actionNames.json           # Extracted demo site actions categories
 │
 ├── reports/                       # Mochawesome HTML/JSON reports from headless runs
 │
 ├── screenshots/                   # Auto-saved screenshots on test failures
 │
 ├── support/
 │   ├── pages/                     # Page Object files
 │   ├── methods/                   # Helper reusable methods
 │   └── commands.js                # Custom Cypress commands

 ```
------------------------------------------------------------------------

## 4. Implemented Test Scenarios

1.  **Navigate to Demo Page**\
    Verify main page loads successfully.
2.  **Extract Actions by Category**\
    Parse all categories (`interaction`, `widget`, etc.) into JSON
    format.
3.  **Retrieve and visit Target URL**\
    Capture and visit the "Submit Button Clicked" events within the "Dynamic Elemements' category.
4.  **Registration**\
    Fill out form using temp email from **Getnada**.
5.  **Lifetime Membership**
    -   Click "Explore Lifetime Membership" link
    -   Scroll to `"30+ Courses video library FREE ACCESS"`
    -   Navigate carousel →
        `"Automation Architect Selenium with 7 live projects"`
    -   Click **Get Started** button
    -   Verify URL matches expected course page.
6.  **Selenium Tutorial Flow**
    -   Find the course `"CucumberParallelWithPageObjects - Project Code"`
    -   Click **Start**
    -   Wait for the page to start by verifying lecture heading is displayed
7.  **Payment Flow**
    -   Navigate back to `"https://www.selenium-tutorial.com/p/automation-architect-inselenium-7-live-projects"`.
    -   Select USD payment
    -   Verify correct price displayed
    -   Click **Enroll in Course**
    -   Validate state changes `"Enroll in Course"` → `"Processing..."`

------------------------------------------------------------------------

## 5. Best Practices Applied

-   **Page Object Model (POM)** → keeps selectors & UI actions reusable
-   **Fixtures** → test data stored in JSON (`url.json`,
    `selenium.json`, etc.)
-   **Test Isolation** → each test starts with fresh visit/reset
-   **Custom Commands** → e.g. `cy.clickVisibleElement()`,
    `cy.verifyUrl()`
-   **Assertions** → visibility, URL, text validation
-   **Flakiness Handling** → retries, waits for visibility, `.should()`
    usage

------------------------------------------------------------------------

## 6. Running Tests

``` bash
# Open Cypress Test Runner (interactive)
npx cypress open

# Run all tests headless
npx cypress run

# Run a specific test file
npx cypress run --spec "cypress/integration/seleniumFlow.spec.js"

```

------------------------------------------------------------------------

## 7. Notes & Limitations

-   CAPTCHA pages (e.g., Teachable checkout) cannot be bypassed via
    Cypress due to anti-bot verification.\
-   External test data can be expanded in `fixtures/`.\
-   Bonus steps (form error validation, screenshots) implemented where
    possible.

------------------------------------------------------------------------

## 8. Authors

-   **Ralph Lawrence Tarlac**\
    QA Automation Engineer
