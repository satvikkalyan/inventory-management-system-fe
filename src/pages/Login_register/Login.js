import { Button, TextField } from "@mui/material"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import classes from './Login.module.css'
import Register from "./Register"
const Login=()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)
    const navigate=useNavigate();
    const handleEmailChange=(event)=>{
        const { name, value } = event.target;
        setEmail(value);

    }
    const handlePasswordChange=(event)=>{
        const { name, value } = event.target;
        setPassword(value)
    }
    const authenticateHandler=(event)=>{
        console.log(email,password)
    }
    const displayRegistration =()=>{
        navigate("/register")

    }
    return (
        <div className={classes.main_div}>
            <TextField type="email" name="email-input" id="email-input" label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
            <TextField type="password" name="password-input" id="password-input" label="Password" variant="outlined" value={password} onChange={handlePasswordChange} />
            <Button type="submit" variant="contained" onClick={authenticateHandler}>Login</Button>
            <Button type="submit" variant="contained" onClick={displayRegistration}>Click here to SignUp</Button>
            
        </div>
    )
}
export default Login