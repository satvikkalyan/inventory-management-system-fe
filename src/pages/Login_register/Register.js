import { Button, TextField } from "@mui/material";
import React, { useState } from "react"; // Don't forget to import React
// Remove import { Form } from "react-router-dom";
import classes from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    passwordMatchError: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    window.alert("registration successful");
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
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.email !== "" &&
      formData.password !== "" &&
      formData.confirmPassword !== "" &&
      formErrors.passwordMatchError === ""
    );
  };

  return (
    <div className={classes.main_div}>
      <form onSubmit={handleSubmit} className={classes.form_div}>
        {/* <div className={classes.textContainer}> */}
        
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
        
        <Button variant="contained" type="submit" disabled={!isFormValid}>
          Submit
        </Button>
        {/* </div> */}
          
      </form>
      </div>
    
  );
};

export default Register;
