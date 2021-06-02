describe('todo mvc app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the correct application title', () => {
    cy.get('h1').should('contain', 'Hello World!');
  })
})
