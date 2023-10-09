import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [secretanswer, setSecretanswer] = useState("");
    const [address, setAddress] = useState("");

    const navigate=useNavigate();

    const registerHandler=async(e)=>{
          e.preventDefault();
        const response=await axios.post("http://localhost:8080/register", {name, email, password, phone, secretanswer, address})

        if(response.status===200){
            navigate("/login")
        }else{
            alert("Registration Failed!")
        }
    }

    return (
        <div className='register'>
            <form onSubmit={registerHandler}>
                <input type='text' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
                <input type='email' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
                <input type='number' placeholder='Enter Your Phone' onChange={(e) => setPhone(e.target.value)} />
                <input type='text' placeholder='Enter Your Secret Answer' onChange={(e) => setSecretanswer(e.target.value)} />
                <input type='text' placeholder='Enter Your Address' onChange={(e) => setAddress(e.target.value)} />
                <button>Signup</button>
            </form>

        </div>
    )
}

export default Register