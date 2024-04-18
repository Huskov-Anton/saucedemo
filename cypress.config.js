const { defineConfig } = require("cypress");
const { faker } = require('@faker-js/faker');
module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1024,
    viewportHeight: 768,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser(){
          return {
             firstName: faker.name.firstName(),
             lastName: faker.name.lastName(),
             postCode: faker.location.zipCode()
          }
        }
      })
    },
  },
});
