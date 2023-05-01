import React from 'react';
import { Row, Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import "./Home.css";
import {Link} from "react-router-dom"


function Home() {
  return (
    <div className='homecontainer'>
    <Row>
        <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
        <div>
            <h1>What is react-markdown?</h1>
            <h5>React-markdown is a react component that converts Markdown text into the corresponding HTML code.uses a syntax tree to build the virtual dom which allows for updating only the changing DOM instead of completely overwriting</h5>
            <LinkContainer to="/dashboard/get">
                <Button variant="success">Get Started
                
                
                </Button>
            </LinkContainer>
           
        </div>
        </Col>
        <Col md={6} className="home__bg" ></Col>
        
    </Row>
    <img src="https://www.freecodecamp.org/news/content/images/2020/05/image-177.png" className='linediagram'></img>
  </div>
  )
}

export default Home