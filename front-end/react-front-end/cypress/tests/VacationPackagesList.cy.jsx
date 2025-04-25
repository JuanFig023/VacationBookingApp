import React from 'react';
import { mount } from '@cypress/react';
import VacationPackagesList from '../../src/Components/vacationpackages';
import 'bootstrap/dist/css/bootstrap.min.css';

describe('<VacationPackagesList />', () => {
  let content;
  let mockSetPageNum;
  let mockSetVacationId;

  beforeEach(() => {
    content = [
    {
      id: 1,
      package_name: 'Beach Getaway',
      price: 500,
      vacation_length: 7,
      description: 'Enjoy a relaxing beach vacation.',
      image_url: 'https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/4:3/w_2668,h_2001,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg',
    },
    {
      id: 2,
      package_name: 'Mountain Retreat',
      price: 300,
      vacation_length: 5,
      description: 'Escape to the mountains.',
      image_url: 'https://imageio.forbes.com/specials-images/imageserve/613f9c315d2ddd9832d1043b/outdoor-view-of-a-luxury-mountain-retreat-at--218-Peregrine-Drive-in-edwards-/960x0.jpg?format=jpg&width=960',
    },
  ];
    mockSetPageNum = cy.stub();
    mockSetVacationId = cy.stub();

    mount(<VacationPackagesList content={content} setPageNum={mockSetPageNum} setVacationId={mockSetVacationId} />);
  });

  it('renders vacation packages', () => {
    cy.get('h1').contains('Vacation Packages Available:');
    cy.get('.card').should('have.length', 2);
    cy.get('.card').first().contains('Beach Getaway');
    cy.get('.card').last().contains('Mountain Retreat');
  });

  it('should navigate to package details on button click', () => {
    cy.get('button').contains('View Details').click();
    cy.wrap(mockSetVacationId).should('have.been.calledWith', 1);
    cy.wrap(mockSetPageNum).should('have.been.calledWith', 2);
  });

  it('should navigate to add vacation package page on button click', () => {
    cy.get('button.btn-success').contains('Add Vacation Package').click();
    cy.wrap(mockSetPageNum).should('have.been.calledWith', 4);
  });
});
