import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import Article from "./Article";
import { API } from "../globle";
import Button from 'react-bootstrap/Button';


function CreateMarkdown() {
  const [markdown, setMarkdown] = useState("# Markdown Preview");
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const navigate = useNavigate();
  
  const onTextChange = e => setMarkdown(e.target.value);

  const onTitleChange = e => setTitle(e.target.value);

  const onDateChange = e => setDate(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const data = {markdown, title, date }; 
    data.email = localStorage.getItem("email")

    const requestOptions = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "x-auth-token" : localStorage.getItem("token")
        },
      body: JSON.stringify(data)
    };
   
    fetch(`${API}/players`, requestOptions)
      .then(response => response.json())
      .then(()=> navigate("/dashboard/get"));
  };



  return (
    
      
      <div className="markdown">
      <div className="division">
          <div className="fields">
              <div>
              <label>Title:</label>
              <input 
               type="text" 
               value={title}
               onChange={onTitleChange}
               required /> 
              </div>

            <div>
            <label>Date:</label>
                <input  
                type="date"
               value={date}
               onChange={onDateChange}
               required />
            </div>
              </div>
      
      <textarea 
        className="input"
        value={markdown}
      //   onChange={(e) => setMarkdown(e.target.value)}
      onChange={onTextChange}
       required 
      > </textarea>
      <Button type="submit" onClick={handleSubmit} variant="primary" className="editbtn">Submit</Button>
      </div>
     
      <Article markdown={markdown}/>
     
    </div>
   
  );
}

export default CreateMarkdown;
