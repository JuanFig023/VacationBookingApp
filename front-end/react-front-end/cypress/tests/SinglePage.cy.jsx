import React from 'react';
import { mount } from '@cypress/react';
import SinglePage from '../../src/Components/singlePage';
import 'bootstrap/dist/css/bootstrap.min.css';

describe('<SinglePage />', () => {
  it('renders and fetches single vacation package data', () => {
    const vacationId = 1;
    const mockSetPageNum = cy.stub();
    const singleView = {
      id: 1,
      package_name: 'Beach Getaway',
      price: 500,
      vacation_length: 7,
      description: 'Enjoy a relaxing beach vacation.',
      image_url: 'https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/4:3/w_2668,h_2001,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg',
    };

    cy.intercept('GET', `http://localhost:8000/api/vacationpackages/${vacationId}`, {
      statusCode: 200,
      body: singleView,
    }).as('getSinglePackage');

    mount(<SinglePage vacationId={vacationId} setPageNum={mockSetPageNum} />);

    cy.wait('@getSinglePackage');
    cy.get('.single-page-image').should('have.attr', 'src', 'https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/4:3/w_2668,h_2001,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg');
    cy.contains('.card-title', 'Beach Getaway').should('be.visible');
    cy.contains('.card-text', 'Price: $500').should('be.visible');
    cy.contains('.card-text', 'Description: Enjoy a relaxing beach vacation.').should('be.visible');
    cy.get('button').contains('Back to Vacation Packages').click();
    cy.wrap(mockSetPageNum).should('have.been.calledWith', 1);
    cy.get('button').contains('Edit Vacation Package').click();
    cy.wrap(mockSetPageNum).should('have.been.calledWith', 3);
    cy.get('button').contains('Delete Vacation Package').click();
    cy.wrap(mockSetPageNum).should('have.been.calledWith', 5);
  });
});
