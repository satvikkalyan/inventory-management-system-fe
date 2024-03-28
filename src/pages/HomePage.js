import { Button } from "@mui/material"
import PasswordRecovery from "./forgot-password/PasswordRecovery"
import Login from "./Login_register/Login"
import Register from "./Login_register/Register"
import { useState } from "react"
const HomePage=()=>{
    const [displayLogin,setDisplayLogin] =useState(false)
    const displayLoginHandler=(event)=>{
        setDisplayLogin(!displayLogin)
    }
    return (
        <>
        <PasswordRecovery></PasswordRecovery>
        <Button onClick={displayLoginHandler}>Login</Button>
        
        {displayLogin &&<Login></Login>}
        </>
    )
}
export default HomePage