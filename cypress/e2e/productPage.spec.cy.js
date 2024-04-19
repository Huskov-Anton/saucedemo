/// <reference types="cypress" />

describe("Product Page", () => {
  beforeEach("", () => {
    cy.visit("/");
    cy.logginUI();
  });

  it("should provide the ability to add items to the cart from product page", () => {
    //cy.addProductsToCart(3) - another way to make this test

    cy.addExactItem("add-to-cart-sauce-labs-backpack");
    cy.addExactItem("add-to-cart-sauce-labs-bike-light");
    cy.addExactItem("add-to-cart-sauce-labs-bolt-t-shirt");

    cy.findByTestId("remove-sauce-labs-backpack").should("be.visible");
    cy.findByTestId("remove-sauce-labs-bike-light").should("be.visible");
    cy.findByTestId("remove-sauce-labs-bolt-t-shirt").should("be.visible");

    cy.findByTestId("shopping-cart-badge").should("contain", "3");
  });

  it('should provide the ability t0 add item to the cart from the item page', () => {
    cy.contains('.inventory_item_name ', 'Sauce Labs Backpack').click();
    cy.findByTestId('add-to-cart').click();
    cy.findByTestId("shopping-cart-badge").should("contain", "1");
  });

  it('should provide the ability to remove items from the product page', () => {
    cy.addExactItem("add-to-cart-sauce-labs-backpack");
    cy.findByTestId("shopping-cart-badge").should("contain", "1");
    cy.findByTestId('remove-sauce-labs-backpack').click();
    cy.findByTestId("shopping-cart-badge").should('not.exist');
  });

  it('should provide the ability to sort items', () => {
    cy.findByTestId('product-sort-container').select('az');
    cy.findByTestId('product-sort-container').select('za');
    cy.findByTestId('product-sort-container').select('lohi');
    cy.findByTestId('product-sort-container').select('hilo');
  });

  it("should provie the ability to logged out", () => {
    cy.get(".bm-burger-button").click();
    cy.findByTestId("logout-sidebar-link").click();
    cy.url().should("eql", "https://www.saucedemo.com/");
  });
});
