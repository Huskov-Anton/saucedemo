/// <reference types="cypress" />

describe('Checkout Page', ()=>{
  let user
    beforeEach('', ()=>{
        cy.visit('/')
        cy.logginUI()
        cy.task("generateUser").then((generatedUser) => {
            user = generatedUser;
          });
    })

    it('should provide the ability to proceeding checkout:', () => {
        cy.addProductsToCart(3)
        
        cy.findByTestId('shopping-cart-link').click()
        cy.findByTestId('title').should('contain', 'Your Cart')
        cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible')
        cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should('be.visible')
        cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt').should('be.visible')
    
        cy.findByTestId('checkout').click()
        cy.findByTestId('title').should('contain', 'Checkout: Your Information')
        cy.findByTestId('firstName').type(user.firstName)
        cy.findByTestId('lastName').type(user.lastName)
        cy.findByTestId('postalCode').type(user.postCode)
        cy.findByTestId('continue').click()
        cy.findByTestId('title').should('contain', 'Checkout: Overview')
        
        cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible')
        cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should('be.visible')
        cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt').should('be.visible')
    
        cy.findByTestId('subtotal-label').should('contain', '55.97')
        cy.findByTestId('tax-label').should('contain', '4.48')
        cy.findByTestId('total-label').should('contain', '60.45')
      });
       
    it('should display the price according to items added to the cart', () => {
    
        cy.addExactItem('add-to-cart-sauce-labs-backpack')
        cy.addExactItem('add-to-cart-sauce-labs-bike-light')
        cy.findByTestId('shopping-cart-link').click()
        cy.findByTestId('checkout').click()
        cy.findByTestId('firstName').type(user.firstName)
        cy.findByTestId('lastName').type(user.lastName)
        cy.findByTestId('postalCode').type(user.postCode)
        cy.findByTestId('continue').click()
    
        cy.findByTestId('inventory-item').eq(0).should('contain', '29.99')
        cy.findByTestId('inventory-item').eq(1).should('contain', '9.99')
        
        cy.findByTestId('subtotal-label').should('contain', '39.98')
        cy.findByTestId('tax-label').should('contain', '3.20')
        cy.findByTestId('total-label').should('contain', '43.18')
      });
    
    it('should provide the ability for submitting the checkout ', () => {
    
        cy.addExactItem('add-to-cart-sauce-labs-backpack')
        cy.addExactItem('add-to-cart-sauce-labs-bike-light')
        cy.findByTestId('shopping-cart-link').click()
        cy.findByTestId('checkout').click()
        cy.findByTestId('firstName').type(user.firstName)
        cy.findByTestId('lastName').type(user.lastName)
        cy.findByTestId('postalCode').type(user.postCode)
        cy.findByTestId('continue').click()
    
        cy.findByTestId('finish').click()
    
        cy.url().should('include', 'checkout-complete')
        cy.findByTestId('complete-header').should('contain', 'Thank you for your order!')
        
        cy.findByTestId('back-to-products').click()
        cy.url().should('include', 'inventory')
      });

    it('shouldnt provide the ability to proceeding checkout without filling firstname field', () => {
        cy.addExactItem('add-to-cart-sauce-labs-backpack')
        cy.findByTestId('shopping-cart-link').click()
        cy.findByTestId('checkout').click()
    
        
        cy.findByTestId('lastName').type(user.lastName)
        cy.findByTestId('postalCode').type(user.postCode)
        cy.findByTestId('continue').click()
        cy.findByTestId('error').should('contain', 'Error: First Name is required')
      });

    it('shouldnt provide the ability to proceeding checkout without filling lastname field', () => {
        cy.addExactItem('add-to-cart-sauce-labs-backpack')
        cy.findByTestId('shopping-cart-link').click()
        cy.findByTestId('checkout').click()
        
        cy.findByTestId('firstName').type(user.firstName)
        cy.findByTestId('postalCode').type(user.postCode)
        cy.findByTestId('continue').click()
        cy.findByTestId('error').should('contain', 'Error: Last Name is required')
      });

    it('shouldnt provide the ability to proceeding checkout without filling post code field', () => {
        cy.addExactItem('add-to-cart-sauce-labs-backpack')
        cy.findByTestId('shopping-cart-link').click()
        cy.findByTestId('checkout').click()

        cy.findByTestId('firstName').type(user.firstName)
        cy.findByTestId('lastName').type(user.lastName)
        cy.findByTestId('continue').click()
        cy.findByTestId('error').should('contain', 'Error: Postal Code is required')
      });
})