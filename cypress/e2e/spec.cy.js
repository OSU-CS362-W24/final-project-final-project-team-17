//Test number 1
describe('Gallery app', () => {
  it('User can make chart as expected', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Line').click();
    cy.contains('Chart title').type('Example Chart');
    cy.contains('X label').type('X');
    cy.contains('Y label').type('Y');
    cy.contains('button', '+').click();
    cy.findAllByText('X').eq(0).type('12');
    cy.findAllByText('X').eq(1).type('8');
    cy.findAllByText('Y').eq(0).type('10');
    cy.findAllByText('Y').eq(1).type('7');
    cy.contains('Generate chart').click();
    cy.get('#chart-img').should('exist');
  })

})