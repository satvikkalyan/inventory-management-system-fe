import { Button, TextField } from "@mui/material";
import React, { useState } from "react"; // Don't forget to import React
// Remove import { Form } from "react-router-dom";
import classes from "./Register.module.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
const Register = () => {
  const [formData, setFormData] = useState({
    user:"",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState('');

  const [formErrors, setFormErrors] = useState({
    passwordMatchError: "",
  });

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      setError('Please fill all fields correctly.');
      return;
    }
    try {
      const formDataToSend = { ...formData };
      delete formDataToSend.confirmPassword;
      const response= await fetch('http://localhost:8080/register',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
      if (!response.ok) {
        const errData = await response.json(); 
        throw new Error(errData.message || "Failed to register");
      }
      setFormData({
        user: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError('');      
    } catch (error) {
      console.error("Error registering user:", error);
      setError(error.message);
    }
    
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "confirmPassword") {
      const newPassword = name === "password" ? value : formData.password;
      const confirmNewPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;

      const passwordMatchError =
        newPassword !== confirmNewPassword ? "Passwords do not match" : "";

      setFormErrors({
        ...formErrors,
        passwordMatchError,
      });
    }
  };
  const isFormValid = () => {
    return (
      formData.userType!=="" &&
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.mobileNumber !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formErrors.passwordMatchError === ""
    );
  };

  return (
    <div className={classes.main_div}>
      <form onSubmit={handleSubmit} className={classes.form_div}>
      <FormLabel id="user-type">User Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="user-type-value"
        name="user"
        onChange={handleChange}
        required
        label="User Type"
      >
        <FormControlLabel value="User" control={<Radio />} label="User" />
        <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
        <FormControlLabel value="Vendor" control={<Radio />} label="Vendor"/>
      </RadioGroup>
        <TextField
          type="text"
          required
          id="firstName"
          name="firstName"
          label="First Name"
          onChange={handleChange}

        />

        <TextField
          type="text"
          required
          id="lastName"
          name="lastName"
          label="Last Name"
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          type="email"
          required
          id="email"
          name="email"
          label="Email"
          onChange={handleChange}
          className={classes.textField}
        />
         <TextField
          type="text"
          required
          id="mobileNumber"
          name="mobileNumber"
          label="Enter your Mobile Number"
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          type="password"
          required
          id="password"
          name="password"
          label="Password"
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          type="password"
          required
          id="confirm_password"
          name="confirmPassword"
          label="Confirm Password"
          onChange={handleChange}
          className={classes.textField}
        />
        {formErrors.passwordMatchError && (
          <span>{formErrors.passwordMatchError}</span>
        )}

        <Button variant="contained" type="submit" disabled={!isFormValid()}>
          Submit
        </Button>
      </form>
      {error && <p id="errorMessage" style={{ color: 'red' }}>{error}</p>}
    </div>

  );
};

export default Register;
