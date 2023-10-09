import React, { useEffect, useState } from 'react'
import { useAuth } from '../pages/Usercontext'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Edituser = () => {
  const [userAuth, setUserauth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate=useNavigate();

  const updateuser=async(e)=>{
      e.preventDefault();
      const {data}=await axios.put(`http://localhost:8080/edit`, {name, email, phone, address})
      if(data){
        setUserauth({...userAuth, user:data.updateuser});
        let ls=localStorage.getItem("auth")
        ls=JSON.parse(ls);
        ls.user=data;
        localStorage.setItem("auth", JSON.stringify(ls));
        if(userAuth?.user?.role===1){
          navigate("/dashboard/admin");
        }else{
          navigate("/dashboard/user");
        }
      }
  }

  useEffect(() => {
    const { name, email, phone, address } = userAuth.user;
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  }, [userAuth?.user])

  return (
    <div className='edituser'>
      <form onSubmit={updateuser}>
        <input type='text' value={name} placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
        <input type='email' value={email} placeholder='Enter Your email' disabled onChange={(e) => setEmail(e.target.value)} />
        <input type='number' value={phone} placeholder='Enter Your Phone' onChange={(e) => setPhone(e.target.value)} />
        <input type='text' value={address} placeholder='Enter Your Address' onChange={(e) => setAddress(e.target.value)} />
        <button>Update</button>
      </form>
    </div>
  )
}

export default Edituser