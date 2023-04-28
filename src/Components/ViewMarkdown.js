 import axios from "axios";
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import React from "react";
import ReactMarkdown from "react-markdown";
import { API } from "../globle";



function ViewMarkdown(){

    const {id} = useParams()

    const [projectData,setProjectData]= useState("")

    useEffect(()=>{
      
        loadUser()
     
    },[])

    let loadUser=async()=>{
        try{
            let project =await axios.get(`${API}/players/${id}`,{
                method:"GET",
                headers:{
                    "x-auth-token" : localStorage.getItem("token")
                }
            })
            console.log(project.data)
            setProjectData(project.data)
        } catch (error){
            console.log(error)
        }
    
     }
     return(
        <>
        <div className="viewcontainer">

            <div className="viewhead">
               <h5>Title: {projectData.title}</h5>
               <h5>Date: {projectData.date}</h5>    
            </div>

            <article className="viewresult">
               <ReactMarkdown className="preview">{projectData.markdown}</ReactMarkdown>
            </article>
            
        </div>
        
       
        </>
     )
}
export default ViewMarkdown;