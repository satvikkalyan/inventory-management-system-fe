import React, { useState } from 'react'
import "./password-recovery.css"
import { Button, TextField } from '@mui/material'
import { validateEmail,isValidOTP, validatePasswords } from "././../../utils/inputValidationUtil"

function EmailInputComponent({ error, email, handleChange, sendOTP }) {
  return (
    <>
      <TextField 
        type="email" 
        name="email-input" 
        id="email-input" 
        label="Email" 
        variant="outlined" 
        value={email} 
        onChange={handleChange} 
        error={error.length > 0}
        helperText={error}
      />
      <Button variant="contained" onClick={sendOTP}>Send OTP</Button>
    </>
  );
}

function OTPInputComponent({ error, otp, handleChange, validateOTP }) {
  return (
    <>
      <TextField 
        id="otp-input" 
        name="otp-input" 
        label="OTP" 
        type="number" 
        variant="outlined" 
        onChange={handleChange} 
        value={otp} 
        error={error.length > 0}
        helperText={error}
      />
      <Button variant="contained" onClick={validateOTP}>Confirm</Button>
    </>
  );
}

function PasswordResetComponent({ error, passwords, handleChange, handlePasswordChange }) {
  return (
    <>
      <TextField 
        id="password-input" 
        name="password-input" 
        label="Password" 
        type="password" 
        variant="outlined" 
        onChange={handleChange} 
        value={passwords.password}
        error={error.length > 0}
        helperText={error}
      />
      <TextField 
        id="confirm-password-input" 
        name="confirm-password-input" 
        label="Confirm Password" 
        type="password" 
        variant="outlined" 
        onChange={handleChange} 
        value={passwords.confirmPassword}
        error={error.length > 0}
        helperText={error} 
      />
      <Button variant="contained" onClick={handlePasswordChange}>Confirm</Button>
    </>
  );
}


function PasswordRecovery() {
  const [requestedOTP, setRequestedOTP] = useState(false)
  const [displayResetForm, setDisplayResetForm] = useState(false)
  const [email, setEmail] = useState("")
  const [otp, setOTP] = useState("")
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({
    email: '',
    otp: '',
    passwords: ''
  });
  
  const handleChange = (event) => {
    const {name, value} = event.target
    switch (name) {
      case "otp-input":
        setOTP(value)
        if (!isValidOTP(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, otp: 'Invalid OTP format' }));
        }
        else {
          setErrors((prevErrors) => ({ ...prevErrors, otp: '' }));
        }
        break
      case "email-input":
        setEmail(value)
        if (!validateEmail(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
        }
        else {
          setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        }
        break
      case "password-input":
        setPasswords({
          ...passwords,
          password: value,
        })
        break
      case "confirm-password-input":
        setPasswords({
          ...passwords,
          confirmPassword: value
        })
        break
      default:
        console.log("Unknown Input Field ", name)
    }
  }
  const sendOTP = () => {
    if (email.length > 0 && validateEmail(email)) {
      setRequestedOTP(true)
    }else {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email' }));
    }

  }
  const validateOTP = () => {
    if (isValidOTP(otp)) {
      setDisplayResetForm(true)
    }
  }
  const handlePasswordChange = () => {
    const paswordValidation = validatePasswords(passwords)
    if (paswordValidation.len) {
      setErrors((prevErrors) => ({ ...prevErrors, passwords: 'Password length cant be 0' }));
    }
    else if(!paswordValidation.match){
      setErrors((prevErrors) => ({ ...prevErrors, passwords: 'Passwords Dont Match' }));
    }
    else {
      setErrors((prevErrors) => ({ ...prevErrors, passwords: '' }));
      console.log("Passwords Match!!")
    }
  }
  return (
    <div className='pr-main-div'>
      <div className='pr-reset-form'>
        {displayResetForm ? (
          <PasswordResetComponent 
            error = {errors.passwords}
            passwords={passwords} 
            handleChange={handleChange} 
            handlePasswordChange={handlePasswordChange} 
          />
        ) : requestedOTP ? (
          <OTPInputComponent error = {errors.otp} otp={otp} handleChange={handleChange} validateOTP={validateOTP} />
        ) : (
          <EmailInputComponent error = {errors.email} email={email} handleChange={handleChange} sendOTP={sendOTP} />
        )}
      </div>
    </div>

  )
}

export default PasswordRecovery