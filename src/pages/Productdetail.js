import axios from 'axios';
import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useCart } from './Cartcontext';

const Productdetail = () => {
    const [product, setProduct]=useState({});
    const {id}=useParams();
    const [cart, setCart]=useCart();

    function addtocart(val){
      setCart([...cart, val])
      localStorage.setItem("cart", JSON.stringify([...cart, val]))
      alert("Item added to cart")
    }

    const singleproduct=async()=>{
        const {data}=await axios.get(`http://localhost:8080/singleproduct/${id}`)
        console.log(data)
        setProduct(data.product);
        
    }

    useEffect(()=>{
        singleproduct();
    }, [])
  return (
    <div className='productdetail'>
        <img src={`http://localhost:8080/uploads/${product.img}`} width={200}/>
        <div className='detailchild'>
            <h2><span>Product Name:</span>{product.name}</h2>
            <h2><span>Product Description:</span>{product.description}</h2>
            <h2><span>Product Price:</span>{product.price}</h2>
            <h2><span>Product Category:</span>{product.category}</h2>
            <button onClick={()=>addtocart(product)}>Add To Cart</button>
        </div>
    </div>
  )
}

export default Productdetail