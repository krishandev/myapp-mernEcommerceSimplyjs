import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useCart } from './Cartcontext'

const Homepage = () => {
const [product, setProduct]=useState([]);
const navigate=useNavigate();
const [cart, setCart]=useCart();

console.log(product)

function addtocart(val){
  setCart([...cart, val])
  localStorage.setItem("cart", JSON.stringify([...cart, val]))
  alert("Item added to cart");
  

}

  async function allproduct(){
    const response=await axios.get("http://localhost:8080/allproduct")
    if(response.status===200){
      setProduct(response.data.products);
    }
  }

  useEffect(()=>{
    allproduct()
  },[])

  return (
  <div className='parent'>
    
   {
    product.map((val)=>(
      <>
      <div className='child'>
        <img src={`http://localhost:8080/uploads/${val.img}`} width={250} />
        <p>{val.description}</p>
        <h3><span>Price:</span>{val.price}</h3>
        <button onClick={()=>navigate(`/product/${val._id}`)}>More Detail</button>
        <button onClick={()=>addtocart(val)}>Add To Cart</button>
      </div>
      </>
    ))
   }
  </div>
  )
}

export default Homepage