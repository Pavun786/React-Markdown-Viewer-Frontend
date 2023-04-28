import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {API} from "../globle"



const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(8, "Need a bigger Email")
    .required("A cool Email is in need"),
    

    
  password: yup
    .string()
    .min(4, "Need a bigger Password")
    .required("A cool Password is in need"),
});

function Login() {
  const [formState, setFormState] = useState("success");

  const navigate = useNavigate();

   const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      
      email: "",
      password: "",
    },

    validationSchema: formValidationSchema,

    onSubmit: async(values) => {
      
    const data = await fetch(`${API}/users/login`,{
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type" : "application/json" },
       })
       
      if(data.status === 401){
         console.log("ERROR")
         setFormState("error");
       }else{
        const result = await data.json();
          console.log("Success",result)

         window.localStorage.setItem("token",result.token)
         window.localStorage.setItem("email",result.email)
         navigate("/dashboard/home")
       }
      
    },
  });
  

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{width: "80%", maxWidth:500 }} onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Label>Email address</Form.Label>
              
              <Form.Control 
             value={values.email}
             type="email"
             placeholder="Enter your Email Id"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             error={touched.email && errors.email}
              />
            <p  style={{color:"red"}}> { touched.email && errors.email ? errors.email : null } </p> 
             

              
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
                          
             />
            <p style={{color:"red"}}> {touched.password && errors.password ? errors.password : null}</p>
            </Form.Group>
           <div className="password">
            <Button variant={ formState === "error" ? "danger" : "success" } type="submit">
        { formState === "error" ? "Retry" : "Login" }
      </Button>
       <Link to="/fortgotpassword" className="link">Forgot Password</Link>
       </div>
            <div className="py-4">
                <p className="text-center">
                    Don't have an account ? <Link to="/register"> Signup </Link>
                </p>

            </div>
            <div>
              <p>For Testing</p>
              <p>Email:student1@gmail.com</p>
              <p>Password:Student1@</p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
