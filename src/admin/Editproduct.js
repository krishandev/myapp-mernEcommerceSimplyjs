import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Editproduct = () => {
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [category, setCategory]=useState("");
    const [price, setPrice]=useState("");
    const [quantity, setQuantity]=useState("");
    const [img, setImg]=useState("");
    const [photo, setPhoto]=useState("");
       
    const navigate=useNavigate();
    const {id}=useParams();

    const singleproduct=async()=>{
        const {data}=await axios.get(`http://localhost:8080/singleproduct/${id}`)
        console.log(data);
        setName(data.product.name);
        setDescription(data.product.description);
        setCategory(data.product.category);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setPhoto(data.product.img)
    }

    useEffect(()=>{
        if(img){
            setPhoto("")
        }
        singleproduct();
    },[img])

    const editproduct=async(e)=>{
         e.preventDefault();
         const productdata=new FormData();
         productdata.append("name", name);
         productdata.append("description", description);
         productdata.append("category", category);
         productdata.append("price", price);
         productdata.append("quantity", quantity);
         productdata.append("img", img || photo)

         const response=await axios.put(`http://localhost:8080/editproduct/${id}`, productdata)
         if(response.status===200){
            navigate('/dashboard/admin/products')
         }else{
            alert("Product update Failed!")
         }
    }

  return (
    <div className='addproduct'>
        <form onSubmit={editproduct}>
            <input type='text' value={name} placeholder='Enter Product Name' onChange={(e)=>setName(e.target.value)}/>
            <input type='text' value={description} placeholder='Enter Product Description' onChange={(e)=>setDescription(e.target.value)}/>
            <input type='text' value={category} placeholder='Enter Product Category' onChange={(e)=>setCategory(e.target.value)}/>
            <input type='number' value={price} placeholder='Enter Product Price' onChange={(e)=>setPrice(e.target.value)}/>
            <input type='number' value={quantity} placeholder='Enter Product Quantity' onChange={(e)=>setQuantity(e.target.value)}/>
            <input type='file'  onChange={(e)=>setImg(e.target.files[0])}/>
            <button>Edit Product</button>
        </form>
    </div>
  )
}


export default Editproduct;