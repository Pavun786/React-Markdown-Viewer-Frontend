import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {API} from "../globle"


const formValidationSchema = yup.object({
    email: yup
      .string()
      .min(8, "Need a bigger Email")
      .required("A cool Email is in need")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
    username: yup
      .string()
      .required("Username is in need"),
      
    password: yup
      .string()
      .min(4, "Need a bigger Password")
      .required("A cool Password is in need"),
  });

function Signup() {

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      username:"",
      email: "",
      password: "",
    },

    validationSchema: formValidationSchema,

    onSubmit: (values) => {
      
      register(values)
    },
  });
  const navigate = useNavigate();

 const register = (newUser) => {

  ////-----> Follow 3 step's <-----////

  //// Step's
  //// 1. Method => POST
  //// 2. body => data & JSON(string)
  //// 3. header => JSON 

  fetch(`${API}/users/register`,{
   method: "POST",
   body: JSON.stringify(newUser),
   headers: { "Content-type" : "application/json" },
  }).then (()=> navigate("/"));

 };
   
  return (
    <Container>
      <Row>
        
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{width: "80%", maxWidth:500 }} onSubmit={handleSubmit}>
             <h1 className="text-center">Create account</h1>
             {/* <div className="signup-profile-pic__container">
                
                <label htmlFor="image-upload" className="image-upload-label">
                    <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input  type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
             </div> */}
             <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>UserName</Form.Label>
              <Form.Control 
                value={values.username}
                type="text"
                placeholder="Enter your Username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && errors.username}
                helperText={touched.username && errors.username ? errors.username : null }
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
               value={values.email}
               type="email"
               placeholder="Enter your Email Id"
               name="email"
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.email && errors.email}
                helperText={touched.email && errors.email ? errors.email : null }
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                value={values.password}
                type="text"
                placeholder="Enter your Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password ? errors.password : null }
              />
            </Form.Group>
          
            <Button variant="primary" type="submit">
             Create account
            </Button>
            <div className="py-4">
                <p className="text-center">
                    Already have an account ? <Link to="/"> Login </Link>
                </p>

            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  )
}

export default Signup