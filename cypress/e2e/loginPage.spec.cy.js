/// <reference types="cypress" />

describe("Login Page", () => {
  beforeEach("", () => {
    cy.visit("/");
  });

  it("should be accessible and contains all needed parts", () => {
    cy.contains("Swag Labs").should("be.visible");
    cy.findByTestId("username").should("be.visible");
    cy.findByTestId("password").should("be.visible");
    cy.findByTestId("login-button").should("be.visible");
    cy.findByTestId("login-credentials-container").should("be.visible");
  });

  it("should provide the ability to logged in with valid creds", () => {
    cy.findByTestId("username").type("standard_user");
    cy.findByTestId("password").type("secret_sauce");
    cy.findByTestId("login-button").click();

    cy.url().should("include", "inventory");
  });

  it("shouldnt provide the ability to logged in with invalid creds", () => {
    cy.findByTestId("username").type("invalid_username");
    cy.findByTestId("password").type("secret_sauce");
    cy.findByTestId("login-button").click();

    cy.findByTestId("error").should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
