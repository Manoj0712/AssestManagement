import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function ShowPage() {
const {id} =useParams();
const [employeeDetails,setEmployeeDetails] = useState({})
const [image,setImage] = useState()
    useEffect(()=>{
        const employee = async()=>{
await fetch(`http://localhost:5000/employee/show/${id}`).then((response)=>{return response.json()})
.then((res)=>{
        setEmployeeDetails(res)})        
}
        employee()
    },[])

    return (
        <div>
    <div>
    <h1>FirstName:{employeeDetails.firstName}</h1>
    </div>
    <div>
    <h1>LastName:{employeeDetails.lastName}</h1>
    </div>          
    <div>
    <h1>Email:{employeeDetails.employeeEmail}</h1>
    </div>      
    <div>
    <h1>DepartMant:{employeeDetails.departMent?employeeDetails.departMent.description:''}</h1>
    </div>
    <div>
        <div>   
             <h1>Image:</h1>
        </div>
    <div>
         {<img src={`data:image/png;base64,${employeeDetails.employeeImage}`} alt="img is not set" className="w-28 h-20 rounded-xl text-center object-cover" />}
                            </div>

    </div>
    <div>
        <div><h1>Employee Name</h1></div>
    </div>
        </div>
    );
}

export default ShowPage;