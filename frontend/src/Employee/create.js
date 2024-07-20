import React, { useEffect, useState } from "react";
import InputBoxWithName from "../Common/InputBoxWithName.js";
import { useNavigate,Link} from 'react-router-dom';


export default function Create() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [active, setActive] = useState(true)
    const [emailAddress, setEmailAddress] = useState("")
    const [image, setImage] = useState("")
    const [imgVal, setImgVal] = useState("")
    const [departmentIdList, setDepartmentIdList] = useState([])
    const [departmentDescription, setDepartmentDescription] = useState([])
    const [department, setDepartment] = useState("")
    const [joinDate, setJoinDate] = useState("")

    const navigate = useNavigate();
    const firstNameUpdate = (event) => {
        setFirstName(event.target.value)
    }
    const lastNameUpdate = (event) => {
        setLastName(event.target.value)
    }
    const emailAddressUpate = (event) => {
        setEmailAddress(event.target.value)
    }
    const dateUpdate = (event) => {
        setJoinDate(event.target.value)
    }
    const activeUpdate = (event) => {
        console.log(event.target.value)
        if (event.target.value === "true" || event.target.value === true) {
            setActive(false)
        } else {
            setActive(true)
        }
    }
    const emailVerification = () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
        if (emailPattern.test(emailAddress)) {
            setEmailAddress(emailAddress)
        } else {
            setEmailAddress("")
        }
    }
    const handleChange = (event) => {
        setImgVal(event.target.files[0])
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
        console.log(event.target.files[0])
    }
    const departmentValueChange = (event) => {
        setDepartment(event.target.value)
    }
    const submitform = async () => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            employeeEmail: emailAddress,
            active: active,
            employeeImage: image,
            joinDate: joinDate,
            department: department
        }
        await fetch("http://localhost:5000/employee/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => { return response.json() })
            .then((res) => {
                if (res._id) {
                    navigate(`/employee/show/${res._id}`)
                } else {
                    console.log("Failed")
                }
            })
    }
    useEffect(() => {
        fetch("http://localhost:5000/employee/department")
            .then((response) => { return response.json() })
            .then((data) => {
                setDepartmentIdList(data.departmentId)
                setDepartmentDescription(data.departmentdescriptionList)
            }).catch((error) => { console.log("error", error) })
    }, [])

    return (
        <>
            <div className="bg-white flex flex-col justify-center items-center">
                <div className='border-2 border-black p-1 rounded-lg hover:scale-125  hover:bg-green-400 hover:text-white'>
                    <Link  to="/employee/index"><h4>Index</h4></Link>
                </div>
                <div className="flex flex-col flex-wrap gap-5 justify-center items-center m-10 p-10  bg-sky-600 border-2 rounded">
                    <InputBoxWithName headerName="First Name" name="firstName" symbol=":" placeholder="Enter Employee FirstName" id="firstName" onchange={firstNameUpdate} value={firstName} className="border-2 border-white pl-2 w-52 h-8 hover:border-black" />
                    <InputBoxWithName headerName="Last Name" name="lastName" symbol=":" placeholder="Enter Employee LastName" id="lastName" onchange={lastNameUpdate} value={lastName} className="border-2 border-white pl-2 w-52 h-8 hover:border-black" />
                    <InputBoxWithName headerName="Email Address" name="emailAddress" symbol=":" placeholder="example@gmail.com" id="emailAddress" onchange={emailAddressUpate} value={emailAddress} onBlurEvent={emailVerification} className="border-2 border-white pl-2 w-52 h-8 hover:border-black" />
                    <InputBoxWithName headerName="JoinDate" type="date" symbol=":" name="JoinDate" placeholder="Date" id="JoinDate" onchange={dateUpdate} value={joinDate} className="border-2 border-white pl-2 w-52 h-8 hover:border-black" />
                    <InputBoxWithName headerName="Active" type="checkbox" name="active" placeholder="Active" id="active" onchange={activeUpdate} value={active} className="border-2 border-white pl-44 w-7 h-7 hover:border-black" />
                    {/* <InputBoxWithName headerName="Image" type="file" name="imageInput" placeholder="Active" id="imageInput" className="border-2 border-white pl-44 w-7 h-7 hover:border-black" /> */}
                    <div className="flex items-center">
                        <div className="text-left w-40">
                            <h1 className="text-xl items-start">Image</h1>
                        </div>:
                        <div className="w-56 flex flex-col gap-2 items-center">
                            <div>
                                {image && <img src={image} alt="img is not set" className="w-28 h-20 rounded-xl text-center object-cover" />}
                            </div>
                            <div>
                                <label htmlFor="file-upload" className="inline-block bg-black p-2 text-white rounded cursor-pointer">
                                    Choose File
                                    <input className="hidden" id="file-upload" type="file" accept="image/*" onChange={(event) => { handleChange(event) }} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="text-left w-40 text-xl">Department</div>
                        <div className="w-56">
                            : <select id="mySelect" onChange={(event) => { departmentValueChange(event) }} className="border-2 w-52 h-8 pl-2 border-white hover:border-black">
                                <option value="Please Select">Please Select</option>
                                {departmentIdList.map((dept, index) => {
                                    return (
                                        <option key={index} value={dept}>{departmentDescription[index]}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button className="w-20 h-10 bg-white border-2 text-xl text-black  hover:bg-green-500 hover:border-green" onClick={() => { submitform() }}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}