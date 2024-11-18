import React from 'react'
import {useState} from 'react';
import "./Form.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
const [formData , setFormData]= useState({
    email:'',
    password:''
})
const navigate=useNavigate();
const [error,setError]=useState('');
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, 
      [name]: value,
    });
  };

const handleSubmit =async(e)=>{
    e.preventDefault();
try {
        const response = await axios.post ('https://auth-backend-138t.onrender.com/api/v1/users/login' , {
        "email": formData.email,
        "password": formData.password,
      });

      console.log(response);
      const token = response.data.data.accessToken;
      console.log(token);

      document.cookie = `accessToken = ${token}; path=/ ; secure; SameSite=Strict`;
      navigate('/Main');
      alert("Login is successful");
}
catch(error)
    {
      console.log("Login error :",error);
      setError("Invalid email or password entered")
    }
}
let errorMessage ;
  if(error)
  {
    errorMessage = <div className = "errorMessage">{error}</div>
  }

  else
  {
    errorMessage = null;
  }
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div id="mainContainer">
        <div id="loginContainer" className={`${theme}_theme`}>
        <form>
            <div id="loginBox">
                <h1>Login Form</h1>
            </div>
            <div >
                <label className="loginUserName1">Email</label>
                <input
                    className="inputlogin1"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="loginPassword1">Password</label>
                <input
                    className="inputlogin2"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errorMessage}
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={toggleTheme}>Toggle Theme</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
