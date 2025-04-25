import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaPlane } from 'react-icons/fa';

const NavBar = ({ setPageNum }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand onClick={() => setPageNum(1)}>
        <FaPlane className="me-3"/>Vacation Manager Pro</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;