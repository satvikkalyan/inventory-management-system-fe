import { Button, TextField } from "@mui/material"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import classes from './Login.module.css'

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email-input':
                setCredentials({
                    ...credentials, email: value
                })
                break
            case 'password-input':
                setCredentials({
                    ...credentials, password: value
                })
                break
            default:
                console.log("Invalid Input ".name)
        }
    }

    const authenticateHandler = (event) => {
        console.log(credentials)
    }
    const displayRegistration = () => {
        navigate("/register")
    }
    return (
        <div className={classes.main_div}>
            <TextField type="email" name="email-input" id="email-input" label="Email" variant="outlined" value={credentials.email} onChange={handleChange} />
            <TextField type="password" name="password-input" id="password-input" label="Password" variant="outlined" value={credentials.password} onChange={handleChange} />
            <Button type="submit" variant="contained" onClick={authenticateHandler}>Login</Button>
            <Button type="submit" variant="contained" onClick={displayRegistration}>Click here to SignUp</Button>
        </div>
    )
}
export default Login