import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="custom-navbar shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold fs-4">
          <i className="bi bi-people-fill text-warning me-2 fs-3"></i>
          <span>EmployeePortal</span>
          <Badge bg="light" text="primary" className="ms-2 fs-6 fw-semibold">
            MERN
          </Badge>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active me-2' : 'me-2')}
            >
              <i className="bi bi-speedometer2 me-1"></i>
              Home / Dashboard
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/employee-form"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="bi bi-person-plus-fill me-1"></i>
              Employee Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
