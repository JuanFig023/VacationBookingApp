import React from 'react';
import { mount } from '@cypress/react';
import EditVacationPackage from '../../src/Components/editvacationpackage';
import 'bootstrap/dist/css/bootstrap.min.css';

describe('<EditVacationPackage />', () => {
  it('renders and fetches vacation package data', () => {
    const content = [
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
    const mockSetPageNum = cy.stub();
    const mockSetVacationId = cy.stub();
    const mockSetContent = cy.stub();

    cy.intercept('GET', 'http://localhost:8000/api/vacationpackages/1', {
      statusCode: 200,
      body: content[0],
    }).as('getPackage');

    mount(<EditVacationPackage vacationId={1} setVacationId={mockSetVacationId} setPageNum={mockSetPageNum} content={content} setContent={mockSetContent} />);

    cy.wait('@getPackage');
    cy.get('h1').contains('Edit Vacation Package');
    cy.get('input[name="package_name"]').should('have.value', 'Beach Getaway');
    cy.get('input[name="price"]').should('have.value', '500');
    cy.get('textarea[name="description"]').should('have.value', 'Enjoy a relaxing beach vacation.');
    cy.get('input[name="vacation_length"]').should('have.value', '7');
    cy.get('input[name="image_url"]').should('have.value', 'https://media.cntraveler.com/photos/675f30d1796d888fdbf7c595/4:3/w_2668,h_2001,c_limit/Bark-Beach-miami_GettyImages-1540357059.jpg');
  });

  it('should update vacation package data on form submission', () => {
    const content = [
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
  const mockSetPageNum = cy.stub();
  const mockSetVacationId = cy.stub();
  const mockSetContent = cy.stub();

  cy.intercept('PUT', 'http://localhost:8000/api/vacationpackages/1', {
    statusCode: 200,
    body: {
      id: 1,
      package_name: 'Bangkok Adventure',
      price: 907.99,
      vacation_length: 9,
      description: 'Explore, the vibrant city of Bangkok, Thailand. Visit the Grand Palace, Wat Arun, and the bustling markets. Enjoy delicious street food and experience the lively nightlife.',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%871.jpg/1920px-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%871.jpg',
    },
  }).as('putPackage');

  mount(<EditVacationPackage vacationId={1} setVacationId={mockSetVacationId} setPageNum={mockSetPageNum} content={content} setContent={mockSetContent} />);

  cy.get('input[name="package_name"]').clear().type('Bangkok Adventure');
  cy.get('input[name="price"]').clear().type('907.99');
  cy.get('textarea[name="description"]').clear().type('Explore, the vibrant city of Bangkok, Thailand. Visit the Grand Palace, Wat Arun, and the bustling markets. Enjoy delicious street food and experience the lively nightlife.');
  cy.get('input[name="vacation_length"]').clear().type('9');
  cy.get('input[name="image_url"]').clear().type('https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%871.jpg/1920px-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%871.jpg');

  cy.get('button[type="submit"]').click();
  cy.wait('@putPackage');

  cy.wrap(mockSetContent).should('have.been.calledWith', [
    {
    id: 1,
    package_name: 'Bangkok Adventure',
    price: 907.99,
    vacation_length: 9,
    description: 'Explore, the vibrant city of Bangkok, Thailand. Visit the Grand Palace, Wat Arun, and the bustling markets. Enjoy delicious street food and experience the lively nightlife.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%871.jpg/1920px-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%871.jpg',
    },
    { 
      id: 2,
      package_name: 'Mountain Retreat',
      price: 300,
      vacation_length: 5,
      description: 'Escape to the mountains.',
      image_url: 'https://imageio.forbes.com/specials-images/imageserve/613f9c315d2ddd9832d1043b/outdoor-view-of-a-luxury-mountain-retreat-at--218-Peregrine-Drive-in-edwards-/960x0.jpg?format=jpg&width=960',
    },
  ]);
  cy.wrap(mockSetPageNum).should('have.been.calledWith', 2);
});


  it('should cancel and redirect to the main page', () => {
    const content = [
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
    const mockSetPageNum = cy.stub();
    const mockSetVacationId = cy.stub();

    mount(<EditVacationPackage vacationId={1} setVacationId={mockSetVacationId} setPageNum={mockSetPageNum} content={content} setContent={() => {}} />);

    cy.get('button[type="button"]').contains('Cancel').click();
    cy.wrap(mockSetPageNum).should('have.been.calledWith', 1);
  });
});
