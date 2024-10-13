import React, { useState } from "react"
import InputBoxWithName from "./Common/InputBoxWithName";
import { Button } from "./Common/Button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confimPassward, setConfimPassward] = useState("")
    const [passwardEqualCheck, setPasswardEqualCheck] = useState(false)
    const [exitesUserName, setExitesUserName] = useState(false)
    const navigate = useNavigate()
    const userNameUpDate = (event) => {
        setUserName(event.target.value)
    }
    const passwordUpDate = (event) => {
        setPassword(event.target.value)
    }
    const confirmPasswordUpDate = (event) => {
        setConfimPassward(event.target.value)
    }
    const signUp = async () => {
        if (password == confimPassward) {
            setPasswardEqualCheck(false)
        } else {
            setPasswardEqualCheck(true)
        }
        let data = {
            userName,
            password
        }
        await fetch("http://localhost:5000/common/signIn", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then((response) => { return response.json() })
            .then((res) => {
                if (res.sign == true) {
                    setExitesUserName(false)
                    navigate("/login")
                } else {
                    console.log("aaaaaaaaaaaaaaaaaaaaa")
                    setExitesUserName(true)
                }
            })
    }
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center ">
            <div className="bg-white gap-2 flex flex-col p-5 rounded-lg box-border">
                {
                    exitesUserName ? <span className="text-red-500">Already in the database,so try another unique name.</span> : ''
                }
                {
                    passwardEqualCheck ? <span className="text-red-500">please check the passward</span> : ''
                }
                <InputBoxWithName headerName="User Name" type="text" onchange={userNameUpDate} name="UserName" symbol=":" placeholder="Enter UserName" id="userName" value={userName} className="border-2 border-black pl-2 w-52 h-8 hover:border-black" />
                <InputBoxWithName headerName="Password" type="password" onchange={passwordUpDate} name="password" symbol=":" placeholder="Enter password" id="userName" value={password} className="border-2 border-black pl-2 w-52 h-8 hover:border-black" />
                <InputBoxWithName headerName="Confirm Password" type="password" onchange={confirmPasswordUpDate} name="confirmpassword" symbol=":" placeholder="Enter ConfirmPassword" id="confirmPassword" value={confimPassward} className="border-2 border-black pl-2 w-52 h-8 hover:border-black" />
                <div className='flex justify-center'>
                    <Button value="SignUp" clickEvent={signUp} />
                </div>

            </div>
        </div>
    )
}
export default SignIn;