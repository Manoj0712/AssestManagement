import React, { useEffect,useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import moment from 'moment';
function Index() {
    const [listOfObject, setListOfObject] = useState([])
    useEffect(() => {
        const list =async()=>{
          await fetch("http://localhost:5000/employee/index")
            .then((response) => { return response.json()})
        .then((res) => {
            setListOfObject(res)})
        }
        list()
    }, [])
    return (
        <div className="flex flex-col gap-5 p-3">
            <div className='flex justify-end gap-2'>
                <Link className='border-2 border-black p-1 rounded-lg hover:scale-125  hover:bg-green-400 hover:text-white' to="/employee/create"><h4>Create</h4></Link>
                {/* <Link className='border-2 border-black p-1 rounded-lg hover:scale-125  hover:bg-green-400 hover:text-white' to="/employee/show/1"><h4>Show</h4></Link> */}
            </div>
            <div>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="border-2 border-black font-bold">First Name</td>
                            <td className="border-2 border-black font-bold">Second Name</td>
                            <td className="border-2 border-black font-bold">Email Address</td>
                            <td className="border-2 border-black font-bold">Join Date</td>
                            <td className="border-2 border-black font-bold">Department</td>
                            <td className="border-2 border-black font-bold">Active</td>
                        </tr>
                        {listOfObject.map((emp,i)=>{
return(
    <tr key={i}>
        <td className="border-2 border-black"><Link to={`/employee/show/${emp._id}`}>{emp.firstName}</Link></td>
        <td className="border-2 border-black">{emp.lastName}</td>
        <td className="border-2 border-black">{emp.employeeEmail}</td>
        <td className="border-2 border-black">{moment(emp.joinDate).format('DD-MM-YYYY')}</td>
        <td className="border-2 border-black">{emp.departMent?emp.departMent.description:""}</td>
        <td className="border-2 border-black">{emp.active?"Yes":"No"}</td>
    </tr>
)})}
                    </tbody>
                </table>
            </div>
            <Outlet />

        </div>
    );
}

export default Index;