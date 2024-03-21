const newColor = '#1100ff';

describe('Gallery app', () => {
  //Test #1(Graph creation)
  it('User can make chart as expected', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Line').click();
    cy.get('#chart-color-input').invoke('val', newColor).trigger('change');
    cy.get('#chart-color-input').should('have.value', newColor);
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

//Test #2(Chart data between pages)
  it('transfers data between chart types/pages', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('Line').click();
    cy.contains('Chart title').type('Example Chart');
    cy.contains('X label').type('X');
    cy.contains('Y label').type('Y');
    cy.contains('button', '+').click();
    cy.findAllByLabelText('X').eq(0).type('20');
    cy.findAllByLabelText('X').eq(1).type('40');
    cy.findAllByLabelText('Y').eq(0).type('30');
    cy.findAllByLabelText('Y').eq(1).type('60');

    cy.contains('Scatter').click();
    cy.findAllByLabelText('X').eq(0).should('have.value', '20');
    cy.findAllByLabelText('X').eq(1).should('have.value', '40');
    cy.findAllByLabelText('Y').eq(0).should('have.value', '30');
    cy.findAllByLabelText('Y').eq(1).should('have.value', '60');

    cy.contains('Bar').click();
    cy.findAllByLabelText('X').eq(0).should('have.value', '20');
    cy.findAllByLabelText('X').eq(1).should('have.value', '40');
    cy.findAllByLabelText('Y').eq(0).should('have.value', '30');
    cy.findAllByLabelText('Y').eq(1).should('have.value', '60');
  })

//Test #3(charts can be saved in gallery)
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

//Test #4(Graphs in gallery can be reopened)
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
    cy.findAllByLabelText('Chart title').eq(0).clear("Example Chart");
    cy.contains("Chart title").type('New chart');
    cy.contains("Save chart").click();
    cy.contains('Gallery').click();
    cy.contains('New chart').should('exist');
  })

})