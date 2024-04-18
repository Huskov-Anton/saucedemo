// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })'

Cypress.Commands.add("findByTestId", (data) => {
  cy.get(`[data-test="${data}"]`);
});

Cypress.Commands.add("addProductsToCart", (amount) => {
  cy.findByTestId("inventory-item")
    .find("button")
    .then(() => {
      const amountOfButtons = amount + 2;
      for (let i = amountOfButtons - 1; i >= 0; i--) {
        cy.get("button").eq(i).click({ force: true });
      }
    });
});

Cypress.Commands.add("addExactItem", (item) => {
  cy.findByTestId(`${item}`).click();
});

Cypress.Commands.add("logginUI", () => {
  cy.findByTestId("username").type("standard_user");
  cy.findByTestId("password").type("secret_sauce");
  cy.findByTestId("login-button").click();
});
