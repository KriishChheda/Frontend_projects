import React, { useState } from 'react';
import "./Form.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  // navigate contains a method that will redirect you to a new component
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    dob: '',
    number: '',
  });
  //formData contains an object which has the inital values of the input texts

  const [theme, setTheme] = useState('light');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { name, email, password, confirmPassword, number } = formData; //destructuralising the object
    let validationErrors = {};
    let formIsValid = true;

    // Name Validation
    const nameRegex = /^[a-zA-Z]{8,20}$/;
    if (!nameRegex.test(name)) {
      formIsValid = false;
      validationErrors.name = "Name must be between 8 to 20 alphabetic characters.";
    }

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      formIsValid = false;
      validationErrors.email = "Please enter a valid email address.";
    }

    // Password Validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      formIsValid = false;
      validationErrors.password = "Password must be 8-20 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Confirm Password Validation
    if (confirmPassword !== password) {
      formIsValid = false;
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    // Phone Number Validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(number)) {
      formIsValid = false;
      validationErrors.number = "Phone number must be exactly 10 digits.";
    }

    setErrors(validationErrors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, 
      [name]: value,
    });
  };
  //we r keeping one handler for all input tags , each input tag has its name , we use their name to make changes in them
  //whenever the value changes we will re render the components passing a new state object

  const handleSubmit = (e) => {
    e.preventDefault(); // this will prevent the page from reloading 
    if (validateForm()) {
    navigate('/login');
    axios.post("https://auth-backend-138t.onrender.com/api/v1/users/register",
      {
        "username": formData.username,
        "fullName": formData.name,
        "email": formData.email,
        "password": formData.password,
        "phone": formData.number,
        "dob": formData.dob
    }
    )
    .then((res)=>{console.log(res)});
    } else {
      alert("Form has errors");
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  // prevTheme will conatain the current theme which is present
  // setTheme will take a new value of the theme variable and re render the component , the new value will be returned by a function

  return (
    <div className={`form `}>
      <div id="container" className={`${theme}_theme`}>
        <div id="Regibox"><h1>Registration Form</h1><hr/></div>
      
        <form onSubmit={handleSubmit}>
          <div className="box">
            <label className="label1">Name</label>
            <input
              className="input1"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="errorMsg">{errors.name}</div>
          </div>

          <div className="box">
            <label className="label2">Email</label>
            <input
              className="input2"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="errorMsg">{errors.email}</div>
          </div>

          <div className="box">
            <label className="label3">User Name</label>
            <input
              className="input3"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className='box'>
            <label className="label4">Password</label>
            <input
              className="input4"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="errorMsg">{errors.password}</div>
          </div>

          <div className='box'>
            <label className="label5">Confirm Password</label>
            <input
              className="input5"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="errorMsg">{errors.confirmPassword}</div>
          </div>

          <div className='box'>
            <label className="label6">DOB</label>
            <input
              className="input6"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div className='box'>
            <label className="label7">Phone Number</label>
            <input
              className="input7"
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
            <div className="errorMsg">{errors.number}</div>
          </div>

          <button type="submit">Submit</button>
          <button type="button" onClick={toggleTheme}>Toggle Theme</button>
        </form>
      </div>
    </div>
  );
};

export default Form;

 