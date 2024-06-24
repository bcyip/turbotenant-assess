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
Cypress.Commands.add('login', () => {
  cy.get('input[type="text"]').type(Cypress.env('username'))
  cy.get('input[type="password"]').type(Cypress.env('password'), {sensitive: true})
  cy.get('button').contains('Login').click();
})

// Delete all properties before test
// This SHOULD be done interacting with backend database
// this is not good practice
Cypress.Commands.add('testprep', () => {
  cy.wait(1000)
  cy.get('body').then(($body) => {
      if ($body.text().includes('No properties available. Please add some.')) {
        cy.log("No properties listed at start of test")
      } else {
        cy.get('.property').each(($element, $index, $list) => {
          cy.wrap($element).find('button').contains("Delete").click()
        })
        cy.get('.properties-container p').should('have.text', 'No properties available. Please add some.')
      }
    })
})

Cypress.Commands.add('addProperty', (prop_title, prop_desc, prop_rent) => {
  cy.get('button').contains('Add Property').click();
  cy.get('input[placeholder="Title"]').type(prop_title);
  cy.get('input[placeholder="Description"]').type(prop_desc);
  cy.get('input[placeholder="Rent"]').type(prop_rent);
  cy.get('button').contains('Submit').click();
})
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options._log = Cypress.log({
      $el: element,
      name: 'type',
      message: '*******',
    })
  }

  return originalFn(element, text, options)
})
