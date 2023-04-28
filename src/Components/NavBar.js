import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ReactRouterBootstrap, { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import {LogOut} from "../Auth/LogOut";

function NavBar() {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <LinkContainer to="/">
        <Navbar.Brand>
           {/* <img src={logo} style={{ width:50, height:50 }} /> */}
        </Navbar.Brand>
      </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            <LinkContainer to="/dashboard/home">
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/dashboard/get">
            <Nav.Link>Projects</Nav.Link>
            </LinkContainer>
            
           
            <Button variant="secondary" onClick={LogOut}>Logout</Button>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;