import React, { useState } from 'react'
import { useAuth } from './Usercontext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const navigate=useNavigate();
  const [userauth, setUserauth]=useAuth();

  const loginHandler=async(e)=>{
      e.preventDefault();
      const response=await axios.post("http://localhost:8080/login", {email, password})

      if(response.status===200){
        console.log(response)
        setUserauth({...userauth, user:response.data.user, token:response.data.token});
        localStorage.setItem("auth", JSON.stringify(response.data))
        navigate('/')
      }else{
        alert("Login Failed")
      }
  }
  return (
    <div className='login'>
      <form onSubmit={loginHandler}>
        <input type='email' placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
        <button>Login</button>
        <NavLink className="fp" to={'/forgotpassword'}>Forgot Password</NavLink>
      </form>
    </div>
  )
}

export default Login