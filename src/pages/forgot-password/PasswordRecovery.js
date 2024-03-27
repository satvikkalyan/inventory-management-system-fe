import React, { useState } from 'react'
import "./password-recovery.css"
import { Button, TextField } from '@mui/material'

function PasswordRecovery() {
  const [requestedOTP, setRequestedOTP] = useState(false)
  const [displayResetForm, setDisplayResetForm] = useState(false)
  const [email, setEmail] = useState("")
  const [otp, setOTP] = useState("")
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: ""
  })
  const handleChange = (event) => {
    const targetName = event.target.name
    const targetValue = event.target.value
    switch (targetName) {
      case "otp-input":
        setOTP(targetValue)
        break
      case "email-input":
        setEmail(targetValue)
        break
      case "password-input":
        setPasswords({
          ...passwords,
          password: targetValue,
        })
        break
      case "confirm-password-input":
        setPasswords({
          ...passwords,
          confirmPassword: targetValue
        })
        break
      default:
        console.log("Unknown Input Field", event.target.name)
    }
    setEmail(targetValue)
  }
  const sendOTP = () => {
    if (email.length > 0) {
      setRequestedOTP(true)
    }
  }
  const validateOTP = () => {
    // Backend Call to validate OTP
    const isValid = true;
    if (isValid) {
      setDisplayResetForm(true)
    }
  }
  const handlePasswordChange = () => {
    if (passwords.password === passwords.confirmPassword) {
      console.log("Passwords Match!!")
    }
    else {
      console.log("Passwords Don't Match!!")

    }
  }
  return (
    <div className='pr-main-div'>
      <div className='pr-reset-form'>
        {displayResetForm ?
          <>
            <TextField id="password-input" name="password-input" label="Password" type="password" variant="outlined" onChange={handleChange} value={passwords.password} />
            <TextField id="confirm-password-input" name="confirm-password-input" label="Confirm Password" type="password" variant="outlined" onChange={handleChange} value={passwords.confirmPassword} />
            <Button variant="contained" onClick={handlePasswordChange} >Confirm</Button>
          </> :
          (requestedOTP ?
            <>
              <TextField id="otp-input" name="otp-input" label="OTP" type="number" variant="outlined" onChange={handleChange} value={otp} />
              <Button variant="contained" onClick={validateOTP} >Confirm</Button>
            </> :
            <>
              <TextField type="email" name="email-input" id="email-input" label="Email" variant="outlined" value={email} onChange={handleChange} />
              <Button variant="contained" onClick={sendOTP}>Send OTP</Button>
            </>)

        }
      </div>

    </div>
  )
}

export default PasswordRecovery