import React, { useState,useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../globle";
import Button from 'react-bootstrap/Button';



export function EditMarkdown() {
   const {id} = useParams();
   const[editdata,setEditData]= useState(null)

   useEffect(()=>{
    fetch(`${API}/players/${id}`,{
        method:"GET",
        headers:{
          "x-auth-token" : localStorage.getItem("token")
        }
       })
       .then((dt)=>dt.json())
       .then((details)=>setEditData(details))
   },[])
   
// useEffect(()=>{
      
//     loadUser()
 
// },[])

// let loadUser=async()=>{
//     try{
//         let project =await axios.get(`http://localhost:4600/players/${id}`,{
//             method:"GET"
//         })
//         console.log(project.data)
//         setEditData(project.data)
//     } catch (error){
//         console.log(error)
//     }

//  }

  return (
    
     <div>{editdata ? <Edit editdata={editdata}/> : null}</div>
   
  );
}
 
 function Edit({editdata}){
    // const markdownData = editdata.markdown;
    // const dateData = editdata.date;
    // const titleData = editdata.title;

    const [markdown, setMarkdown] = useState(editdata.markdown);
  const [title, setTitle] = useState(editdata.title)
  const [date, setDate] = useState(editdata.date)

  const navigate = useNavigate();
  
  const onTextChange = e => setMarkdown(e.target.value);

  const onTitleChange = e => setTitle(e.target.value);

  const onDateChange = e => setDate(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const data = {markdown, title, date };
    const requestOptions = {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "x-auth-token" : localStorage.getItem("token")
        },
      body: JSON.stringify(data)
    };
    fetch(`${API}/players/${editdata._id}`, requestOptions)
      .then(response => response.json())
      .then(()=>navigate("/dashboard/get"));
  };


    return(
        <form className="markdown">
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
        <Button type="submit" variant="primary" onClick={handleSubmit} className="editbtn">Submit</Button>
        </div>
        
        {/* <div className="preview">
        <h4>Previewer</h4> */}
       
        <article className="result">
          <ReactMarkdown >{markdown}</ReactMarkdown>
        </article>
        
        {/* </div> */}
      </form>
    )
 }



