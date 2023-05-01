import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PreviewIcon from '@mui/icons-material/Preview';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Button from '@mui/material/Button';
import { CheckAuth } from "../Auth/CheckAuth";
import { LogOut } from "../Auth/LogOut";
import { API } from "../globle";

function Mardown() {
    const [data, setData] = useState([])

    useEffect(() => getDetails(), [])

    const getDetails = () => {
        fetch(`${API}/players/markdown/${localStorage.getItem("email")}`, {
            method: "GET",
            headers:{
                "x-auth-token" : localStorage.getItem("token")
            }
        })
        .then((data) => CheckAuth(data))
        .then((mbs) => setData(mbs))
        .catch((err) => LogOut())  
    }
     
    let projectDelete = async (id)=>{
   
        try{
            let ask= window.confirm("Do you want to delete this data.?"
            );
            if(ask){
                await axios.delete(`${API}/players/${id}`);
                getDetails();
            }
        }catch (error){
           console.log(error)
        }
        
       }
    console.log(data)
    return (
        <div className="create">
            <Link to="/dashboard/create"><Button variant="outlined" style={{color:"white",backgroundColor:"green"}} >Create Project</Button></Link>
            
            <Table striped bordered hover>
                <thead>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Action</th>
                </thead>
                <tbody>

               {data.map((project) => {
                        return (
                          <tr>
                                <td>{project.title}</td>
                                <td>{project.date}</td>
                                <td className="threebtns">
                                    <Link to={`/dashboard/view/${project._id}`}><PreviewIcon/></Link>
                                   <Link to={`/dashboard/edit/${project._id}`}><EditNoteIcon/></Link> 
                                    <DeleteIcon onClick={()=>projectDelete(project._id)}/>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default Mardown;