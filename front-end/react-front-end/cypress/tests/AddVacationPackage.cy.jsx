import React from 'react';
import { mount } from '@cypress/react';
import AddVacationPackage from '../../src/Components/addvacationpackage';
import 'bootstrap/dist/css/bootstrap.min.css';

describe('<AddVacationPackage />', () => {
  it('renders and submits data', () => {
    const mockSetContent = cy.stub();
    const mockSetPageNum = cy.stub();
    const content = [];

  cy.intercept('POST', 'http://localhost:8000/api/vacationpackages', {
    statusCode: 200,
      body: {
      package_name: 'Beach Getaway',
      price: 500,
      vacation_length: 7,
      description: 'Enjoy a relaxing beach vacation.',
      image_url: 'https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/4:3/w_2668,h_2001,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg',
    },
  }).as('postPackage');

  mount(<AddVacationPackage content={content} setContent={mockSetContent} setPageNum={mockSetPageNum} />);

    cy.get('input[name="package_name"]').type('Beach Getaway');
    cy.get('input[name="price"]').type('500');
    cy.get('textarea[name="description"]').type('Enjoy a relaxing beach vacation.');
    cy.get('input[name="vacation_length"]').type('7');
    cy.get('input[name="image_url"]').type('https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/4:3/w_2668,h_2001,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg');

    cy.get('button[type="submit"]').click();
    
    cy.wait('@postPackage');

    cy.wrap(mockSetContent).should('have.been.calledWith', [
      {
        package_name: 'Beach Getaway',
        price: 500,
        vacation_length: 7,
        description: 'Enjoy a relaxing beach vacation.',
        image_url: 'https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/4:3/w_2668,h_2001,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg',
      },
    ]);
    cy.wrap(mockSetPageNum).should('have.been.calledWith', 1);
  });

  it('should cancel and redirect to the vacation packages list', () => {
    const mockSetPageNum = cy.stub();
    const content = [];

    mount(<AddVacationPackage content={content} setContent={() => {}} setPageNum={mockSetPageNum} />);

    cy.get('button[type="button"]').contains('Cancel').click();
    cy.wrap(mockSetPageNum).should('have.been.calledWith', 1);
  });

});

  