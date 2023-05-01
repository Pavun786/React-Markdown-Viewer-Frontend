import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ReactRouterBootstrap, { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import {LogOut} from "../Auth/LogOut";

function NavBar() {

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
      <LinkContainer to="/">
        <Navbar.Brand>
           {/* <img src={logo} style={{ width:50, height:50 }} /> */}
        </Navbar.Brand>
      </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <LinkContainer to="/dashboard/home" style={{color:"white"}}>
            <Nav.Link>React-Markdown</Nav.Link>
            </LinkContainer>
          <Nav className="ms-auto">
            
            <LinkContainer to="/dashboard/home" style={{color:"white"}}>
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/dashboard/get" style={{color:"white"}}>
            <Nav.Link>Projects</Nav.Link>
            </LinkContainer>
            
           
            <Button variant="danger"  onClick={LogOut}>Logout</Button>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;