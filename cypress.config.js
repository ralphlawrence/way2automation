const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'uk7zre',
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 60000,
  video: false,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  chromeWebSecurity: false,
  e2e: {
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://www.way2automation.com',
    specPattern: 'cypress/e2e/**/*.spec.js',
    experimentalSessionAndOrigin: true,
  },
})
