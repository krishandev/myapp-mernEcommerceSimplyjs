import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [category, setCategory]=useState("");
    const [price, setPrice]=useState("");
    const [quantity, setQuantity]=useState("");
    const [img, setImg]=useState("");
       
    const navigate=useNavigate();

    const addproduct=async(e)=>{
         e.preventDefault();
         const productdata=new FormData();
         productdata.append("name", name);
         productdata.append("description", description);
         productdata.append("category", category);
         productdata.append("price", price);
         productdata.append("quantity", quantity);
         productdata.append("img", img)

         const response=await axios.post("http://localhost:8080/addproduct", productdata)
         if(response.status===200){
            navigate('/dashboard/admin/products')
         }else{
            alert("Product Add Failed!")
         }
    }

  return (
    <div className='addproduct'>
        <form onSubmit={addproduct}>
            <input type='text' placeholder='Enter Product Name' onChange={(e)=>setName(e.target.value)}/>
            <input type='text' placeholder='Enter Product Description' onChange={(e)=>setDescription(e.target.value)}/>
            <input type='text' placeholder='Enter Product Category' onChange={(e)=>setCategory(e.target.value)}/>
            <input type='number' placeholder='Enter Product Price' onChange={(e)=>setPrice(e.target.value)}/>
            <input type='number' placeholder='Enter Product Quantity' onChange={(e)=>setQuantity(e.target.value)}/>
            <input type='file' onChange={(e)=>setImg(e.target.files[0])}/>
            <button>Add Product</button>
        </form>
    </div>
  )
}

export default Addproduct