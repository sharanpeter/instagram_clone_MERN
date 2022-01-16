import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../App'




const Navbar=()=>{
  
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  const logout=()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    navigate('/signin')
    
  }
  const navList=()=>{
    if(state){
      return [ <li><Link to="/profile">My Profile</Link></li>,
      <li><Link to="/createPost">New Post</Link></li>,
      <li><Link to="/user/:userid">User Profile</Link></li>,
      <li>
      <button className="btn #e53935 red darken-1" type="submit" onClick={()=>logout()} >Logout</button>
      </li>]
     
    }
    else{
      return [ <li><Link to="/signin">Sign in</Link></li>,
      <li><Link to="/signup">Signup</Link></li>]

    }
  }
return <nav>
<div class="nav-wrapper">
  <Link to={state?"/":"/signin"} class="brand-logo left">Logo</Link>
  <ul id="nav-mobile" class="right hide-on-med-and-down navlinks">
   {navList()}
  </ul>
</div>
</nav>}

export default Navbar