import React,{useState, useContext, createContext, useEffect} from 'react'

const Cartcontext=createContext();
const Cartprovider = ({children}) => {

  const [cart, setCart]=useState([]);

  useEffect(()=>{
   let existitem=localStorage.getItem("cart")
   if(existitem) setCart(JSON.parse(existitem))
  }, [])
  return (
    <Cartcontext.Provider value={[cart, setCart]}>
      {children}
      
    </Cartcontext.Provider>
  )
}

//custom hook

const useCart=()=>useContext(Cartcontext)

export {useCart, Cartprovider}