import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Adminmenu from '../components/Adminmenu'
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [product, setProduct]=useState([]);
  const navigate=useNavigate();

 async function productdelete(id){
   const response=await axios.delete(`http://localhost:8080/deleteproduct/${id}`)
   if(response.status===200){
    allproduct();
   }
   else{
    alert("Error in Product Delete")
   }
 }

  console.log(product)
  const allproduct=async()=>{
    const response=await axios.get("http://localhost:8080/allproduct")
    if(response.status===200){
      setProduct(response.data.products)
    }
  }

  useEffect(()=>{
    allproduct();
  }, [])
  return (
    <div className='adminmenu'>
      <Adminmenu/>
      {/* <h1>All Products</h1> */}
      <table>
        <thead>
          <tr>
            <th>S.no.</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th className='action-btn'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            product.map((val, index)=>(
              <tr className='tbody-child'>
                <td>{index+1}</td>
                <td>{val.name}</td>
                <td>{val.category}</td>
                <td>{val.price}</td>
                <td>{val.quantity}</td>
                <td><img src={`http://localhost:8080/uploads/${val.img}`} width={200}/></td>
                <td>
                  <td onClick={()=>navigate(`/dashboard/admin/editproduct/${val._id}`)}>Edit</td>
                  <td onClick={()=>productdelete(val._id)}>Delete</td>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Products