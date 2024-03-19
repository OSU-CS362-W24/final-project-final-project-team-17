//Test number 1
describe('Gallery app', () => {
  it('User can make chart as expected', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Line').click();
    cy.contains('Chart title').type('Example Chart');
    cy.contains('X label').type('X');
    cy.contains('Y label').type('Y');
    cy.contains('button', '+').click();
    cy.findAllByText('X').eq(0).type('1');
    cy.findAllByText('X').eq(1).type('3');
    cy.findAllByText('Y').eq(0).type('2');
    cy.findAllByText('Y').eq(1).type('4');
    cy.contains('Generate chart').click();
    cy.get('#chart-img').should('exist');
  })

  it('User can save graph in gallery for later look up', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Line').click();
    cy.contains('Chart title').type('Example Chart');
    cy.contains('X label').type('X');
    cy.contains('Y label').type('Y');
    cy.contains('button', '+').click();
    cy.contains('button', '+').click();
    cy.findAllByText('X').eq(0).type('2');
    cy.findAllByText('X').eq(1).type('4');
    cy.findAllByText('Y').eq(0).type('4');
    cy.findAllByText('Y').eq(1).type('8');
    cy.findAllByText('X').eq(2).type('6');
    cy.findAllByText('Y').eq(2).type('10');
    cy.contains('Generate chart').click();
    cy.contains('Save chart').click();
    cy.contains('Gallery').click();
    cy.contains('Example Chart').should('exist');
  })


  it('allows user to click on chart in gallery to contuie working', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Line').click();
    cy.contains('Chart title').type('Example Chart');
    cy.contains('X label').type('X');
    cy.contains('Y label').type('Y');
    cy.contains('button', '+').click();
    cy.contains('button', '+').click();
    cy.findAllByText('X').eq(0).type('2');
    cy.findAllByText('X').eq(1).type('4');
    cy.findAllByText('Y').eq(0).type('4');
    cy.findAllByText('Y').eq(1).type('8');
    cy.findAllByText('X').eq(2).type('6');
    cy.findAllByText('Y').eq(2).type('10');
    cy.contains('Generate chart').click();
    cy.contains('Save chart').click();
    cy.contains('Gallery').click();
    cy.contains('Example Chart').click();
    cy.contains("Generate chart").should('exist');
  })
})