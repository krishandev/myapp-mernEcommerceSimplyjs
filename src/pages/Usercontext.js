import React, {useState, createContext,useEffect ,useContext} from 'react'
import axios from 'axios';

const Authcontext=createContext();

const Usercontext = ({children}) => {
  const [userauth, setUserauth]=useState({
    user:null,
    token:""
  });

  //default authorization 
  axios.defaults.headers.common["Authorization"]=userauth?.token

  useEffect(()=>{
    const userdata=localStorage.getItem("auth")
    if(userdata){
      const parsedata=JSON.parse(userdata)
      setUserauth({...userauth, user:parsedata.user, token:parsedata.token})
    }
  }, [])
  return (
    <div>
      <Authcontext.Provider value={[userauth, setUserauth]}>
        {children}
      </Authcontext.Provider>
    </div>
  )
}

//custom hook
const useAuth=()=>useContext(Authcontext);
export {useAuth, Usercontext}