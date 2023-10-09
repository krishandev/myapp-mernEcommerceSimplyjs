import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useAuth} from './Usercontext'
import {useCart} from './Cartcontext'
import {useNavigate} from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'

const Cartpage = () => {
  const [userAuth, setUserauth]=useAuth();
  const [cart, setCart]=useCart();
  const [clienttoken, setClientToken]=useState("");
  const [instance, setInstance]=useState("");
  const navigate=useNavigate();

  const removecartitem=(pid)=>{
    
    let mycart=[...cart];
    let index=mycart.findIndex((item)=>item._id===pid);
    mycart.splice(index, 1);
    setCart(mycart);
    localStorage.setItem("cart", JSON.stringify(mycart));
  }

  const totalprice=()=>{
    try {
      let total=0;
      cart.map((item)=>{
        total=total + item.price;
      })

      return total;
    } catch (error) {
      console.log(error)
    }
  }

  const gettoken=async()=>{
    try {
      const {data}=await axios.get("http://localhost:8080/braintree/token")
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error)
    }

  }

useEffect(()=>{
  gettoken();
}, [userAuth?.token])

const handlepayment=async()=>{
  try {
    const {nonce}=await instance.requestPaymentMethod();
    const {data}=await axios.post("http://localhost:8080/brintree/payment", {
      nonce, cart
    })
    localStorage.removeItem("cart");
    setCart([]);
    alert("Payment Sucessfull")
    navigate("/dashboard/user/orders")
  } catch (error) {
    console.log(error)
      alert(error)
      navigate("/dashboard/user/orders")
  }
}

  return (
    <div className='cartpage'>
      <h2>{!userAuth?.user? "Hello Guest" : `Hello ${userAuth?.token && userAuth?.user?.name}`}
      <p>
        {cart?.length ? `You have ${cart.length} items in your cart ${userAuth?.token? "" :"Please login to checkout"}` :"Your cart is empty"}
      </p>
      </h2>
      <div className='parentcart'>
        <div className='container'>
          {
            cart?.map((p)=>(
              <>

              <div className='first'>
                <img src={`http://localhost:8080/uploads/${p.img}`} width={200}/>
                <div>
                  <p><span>Product: </span>{p.name}</p>
                  <p><span>Description: </span>{p.description}</p>
                  <p><span>Price: </span>{p.price}</p>
                  <button onClick={()=>removecartitem(p._id)}>Remove Item</button>
                </div>
              </div>
              </>
            ))
          }
        </div>
        <div className='second'>
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr/>
          <h4>Total: {totalprice()}</h4>
          {
            userAuth?.user?.address?(
              <>
              <div>
                <h3>Current Address</h3>
                <h5>{userAuth?.user?.address}</h5>
                <button onClick={()=>navigate("/dashboard/user/edit")}>Update Address</button>
              </div>
              </>
            ):(
              <div>
                {
                  userAuth?.token?(
                    <button onClick={()=>navigate("/dashboard/user/edit")}>Update Address</button>

                  ):(<button onClick={()=>navigate("/login")}>Pls Login to Checkout</button>
                )}
              </div>
            )
          }
         <div>
          {!clienttoken || !userAuth?.token || !cart?.length?(
            <>
            
            </>

          ):(
            <>
            <DropIn options={{authorization:clienttoken, paypal:{flow:"vault"},}}
            onInstance={(instance)=>setInstance(instance)}
            />
            <button onClick={handlepayment} disabled={!userAuth?.user?.address || !instance} >Make Payment</button>
            </>
          )}
         </div>
        </div>
      </div>
    </div>
  )
}

export default Cartpage