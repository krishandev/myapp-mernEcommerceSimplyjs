import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <div className='usermenu'>
        <NavLink to={'/dashboard/admin/orders'}>Orders</NavLink>
        <NavLink to={'/dashboard/admin/addproduct'}>Add Product</NavLink>
        <NavLink to={'/dashboard/admin/products'}>Products</NavLink>
        <NavLink to={'/dashboard/user/edit'}>Edit Profile</NavLink>
    </div>
  )
}

export default Adminmenu