import React, { useState,useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../globle";


export function EditMarkdown() {
   const {id} = useParams();
   const[editdata,setEditData]= useState(null)

   useEffect(()=>{
    fetch(`${API}/${id}`,{
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
    fetch(`${API}/${editdata._id}`, requestOptions)
      .then(response => response.json())
      .then(res => console.log(res));
  };


    return(
        <form className="markdown">
        <div className="division">
            <div className="fields">
                <div>
                <label>Title</label>
                <input 
                 type="text" 
                 value={title}
                 onChange={onTitleChange}
                 required /> 
                </div>

              <div>
              <label>Date</label>
                  <input  
                  type="date"
                 value={date}
                 onChange={onDateChange}
                 required />
              </div>
                </div>
        
        <textarea rows="35" cols="85"
          className="input"
          value={markdown}
        //   onChange={(e) => setMarkdown(e.target.value)}
        onChange={onTextChange}
         required 
        > </textarea>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        
        <article className="result">
          <ReactMarkdown className="preview">{markdown}</ReactMarkdown>
        </article>
      </form>
    )
 }



