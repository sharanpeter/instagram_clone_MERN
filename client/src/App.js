import React, { createContext, useEffect, useReducer,useContext } from 'react'
import {BrowserRouter,Routes,Route, useNavigate  } from "react-router-dom"
import Home from "./components/screens/home"
import Profile from "./components/screens/profile"
import UserProfile from "./components/screens/UserProfile"
import Login from "./components/screens/login"
import Signup from "./components/screens/signup"
import Navbar from "./components/navbar"
import CreatePost from './components/screens/createPost'
import { reducer,initialState } from "./reducers/userReducer"


const Routing=()=>{
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
     
    }
    else{
      navigate('/signin')
    }
  },[])

  return(
    
    <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/profile' element={<Profile/>} />
    <Route exact path='/user/:userid' element={<UserProfile/>} />
    <Route exact path='/signup' element={<Signup/>} />
    <Route exact path='/signin' element={<Login/>} />
    <Route exact path='/createpost' element={<CreatePost/>} />
    
    </Routes>
    
  )
}
export const UserContext=createContext()
function App() {

  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/>
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App
