export const jQueryBypass = () => {
  Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('jQuery is not defined')) {
        return false
      }
    })
};