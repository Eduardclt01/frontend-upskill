describe('todo mvc app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the correct application title', () => {
    cy.get('h1').should('contain', 'todos');
  });

  it('should allow adding a new todo', () => {
    cy.get('.todoapp-list').children().should('have.length', 0);
    cy.get('input[placeholder="What needs to be done?"]').type('test 1{enter}');
    cy.get('.todoapp-list').children().should('have.length', 1);
    cy.get('.todoapp-list > .todo-list-item').eq(0).find('[aria-label="Title"]').should('have.text', 'test 1');
    cy.get('input[placeholder="What needs to be done?"]').should('have.value', '');
  });

  it('should allow adding multiple new todos', () => {
    cy.get('.todoapp-list').children().should('have.length', 0);
    cy.get('input[placeholder="What needs to be done?"]').type('test 1{enter}');
    cy.get('input[placeholder="What needs to be done?"]').type('test 2{enter}');
    cy.get('input[placeholder="What needs to be done?"]').type('test 3{enter}');
    cy.get('.todoapp-list').children().should('have.length', 3);
    cy.get('.todoapp-list > *').eq(0).find('[aria-label="Title"]').should('have.text', 'test 3');
    cy.get('.todoapp-list > *').eq(1).find('[aria-label="Title"]').should('have.text', 'test 2');
    cy.get('.todoapp-list > *').eq(2).find('[aria-label="Title"]').should('have.text', 'test 1');
  });

  it('should allow marking todos as complete', () => {
    cy.get('input[placeholder="What needs to be done?"]').type('test 1{enter}');
    cy.get('input[placeholder="What needs to be done?"]').type('test 2{enter}');
    cy.get('input[placeholder="What needs to be done?"]').type('test 3{enter}');

    cy.get('.todoapp-list > *').eq(0).find('[aria-label="Toggle"]').click();
    cy.get('.todoapp-list > *').eq(0).should('have.attr', 'data-status').and('equal', 'completed');
    cy.get('.todoapp-list > *').eq(0).find('[aria-label="Toggle"]').click();
    cy.get('.todoapp-list > *').eq(0).should('have.attr', 'data-status').and('equal', 'not-completed');
    cy.get('.todoapp-list > *').eq(1).find('[aria-label="Toggle"]').click();
    cy.get('.todoapp-list > *').eq(1).should('have.attr', 'data-status').and('equal', 'completed');
    cy.get('.todoapp-list > *').eq(2).find('[aria-label="Toggle"]').click();
    cy.get('.todoapp-list > *').eq(2).should('have.attr', 'data-status').and('equal', 'completed');
    cy.get('.todoapp-list > *').eq(1).find('[aria-label="Toggle"]').click();
    cy.get('.todoapp-list > *').eq(2).find('[aria-label="Toggle"]').click();
    cy.get('.todoapp-list > *').eq(1).should('have.attr', 'data-status').and('equal', 'not-completed');
    cy.get('.todoapp-list > *').eq(2).should('have.attr', 'data-status').and('equal', 'not-completed');
  });

  it('should allow deleting todos', () => {
    cy.get('input[placeholder="What needs to be done?"]').type('test 1{enter}');
    cy.get('input[placeholder="What needs to be done?"]').type('test 2{enter}');
    cy.get('input[placeholder="What needs to be done?"]').type('test 3{enter}');

    cy.get('.todoapp-list').children().should('have.length', 3);
    cy.get('.todoapp-list > *').eq(0).find('[aria-label="Delete"]').click({ force: true });
    cy.get('.todoapp-list').children().should('have.length', 2);
  });

  it('should allow filtering the todos based on their state', () => {
    cy.get('.todoapp-filters').contains('All').click();
    cy.get('.todoapp').should('have.attr', 'data-selected-filter-name').and('equal', 'all');
    cy.get('.todoapp-filters').contains('Active').click();
    cy.get('.todoapp').should('have.attr', 'data-selected-filter-name').and('equal', 'active');
    cy.get('.todoapp-filters').contains('Completed').click();
    cy.get('.todoapp').should('have.attr', 'data-selected-filter-name').and('equal', 'complete');
  });

})
