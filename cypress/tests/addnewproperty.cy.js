describe('Add New Property', () => {
  beforeEach(function(){
    cy.visit('/');
    cy.login();
    cy.testprep();
  })

  it('with valid data', () => {
    const property_title = "Valid Property Title";
    const property_description ="Valid Property Description 1 bed";
    const property_rent ="123456";

    cy.addProperty(property_title, property_description, property_rent);

    cy.get('.propertyWrapper h3').should('have.text', property_title);
    cy.get('.propertyWrapper p').first().should('have.text', property_description);
    cy.get('.propertyWrapper p').eq(1).should('have.text', 'Rent: $'+property_rent);
  })

  it('but Cancel Before Adding', () => {
    const property_title = "Property Not Added";
    const property_description ="This Property should not have been added";
    const property_rent ="1252351";

    cy.get('button').contains('Add Property').click();
    cy.get('input[placeholder="Title"]').type(property_title);
    cy.get('input[placeholder="Description"]').type(property_description);
    cy.get('input[placeholder="Rent"]').type(property_rent);
    cy.get('button').contains('Cancel').click();

    cy.get('.properties-container p').should('have.text', 'No properties available. Please add some.')
  })

  it.skip('Long Title', () => {
    const property_title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const property_description ="Long Title Description";
    const property_rent ="1252351";

    cy.addProperty(property_title, property_description, property_rent);

    //TODO: validation
  })

  it('Long Description', () => {
    const property_title = "Long Description Title";
    const property_description ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const property_rent ="1252351";

    cy.addProperty(property_title, property_description, property_rent);

    cy.get('.propertyWrapper h3').should('have.text', property_title);
    cy.get('.propertyWrapper p').first().should('have.text', property_description);
    cy.get('.propertyWrapper p').eq(1).should('have.text', 'Rent: $'+property_rent);
  })

  it.skip('when title is empty', () => {
    const property_title = "";
    const property_description ="No Title for this entry";
    const property_rent ="121212";

    cy.addProperty(property_title, property_description, property_rent);

    //TODO: Validation
  })

  it.skip('when description is empty', () => {
    const property_title = "No Description for this";
    const property_description ="";
    const property_rent ="44444444";

    cy.addProperty(property_title, property_description, property_rent);
    //TODO: Validation
  })

  it.skip('when rent is empty', () => {
    const property_title = "No Rent for this property";
    const property_description ="No rent description";
    const property_rent ="";

    cy.addProperty(property_title, property_description, property_rent);
    //TODO: Validation
  })
})
