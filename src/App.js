import React from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Forgotpassword from './pages/Forgotpassword'
import Privateroute from './route/Privateroute'
import Userdashboard from './user/Userdashboard'
import Adminroute from './route/Adminroute'
import Admindashboard from './admin/Admindashboard'
import Edituser from './user/Edituser'
import Addproduct from './admin/Addproduct'
import Products from './admin/Products'
import Editproduct from './admin/Editproduct'
import Productdetail from './pages/Productdetail'
import Cartpage from './pages/Cartpage'


const App = () => {
  return (

    <div>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgotpassword' element={<Forgotpassword/>}/>
      <Route path='/product/:id' element={<Productdetail/>}/>
      <Route path='/cart' element={<Cartpage/>}/>

      {/* Private Routes */}

      <Route path='/dashboard' element={<Privateroute/>}>
        <Route path='user' element={<Userdashboard/>}/>
        <Route path='user/edit' element={<Edituser/>}/>
      </Route>

      <Route path='/dashboard' element={<Adminroute/>}>
        <Route path='admin' element={<Admindashboard/>}/>
        <Route path='admin/addproduct' element={<Addproduct/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/editproduct/:id' element={<Editproduct/>}/>
      </Route>

    </Routes>
    </div>
  )
}

export default App