import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Forgotpassword = () => {
    const [email, setEmail]=useState("");    
    const [newpassword, setNewpassword]=useState("");
    const [secretanswer, setSecretanswer]=useState("");
    const navigate=useNavigate();

    const forgotpasswordHandler=async(e)=>{
        e.preventDefault();
        const response=await axios.post("http://localhost:8080/forgotpassword", {
            email, newpassword, secretanswer
        }) 
        
        if(response.status===200){
            navigate("/login")
        }else{
            alert("Password Updation Failed!")
        }
    }

  return (
    <div className='forgotpassword'>
        <form onSubmit={forgotpasswordHandler}>
            <input type='email' placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Enter Your New Password' onChange={(e)=>setNewpassword(e.target.value)}/>
            <input type='text' placeholder='Enter Secret Answer' onChange={(e)=>setSecretanswer(e.target.value)}/>
            <button>Reset Password</button>
        </form>
    </div>
  )
}

export default Forgotpassword