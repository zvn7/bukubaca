// Header.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Your Dashboard</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#logout">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
