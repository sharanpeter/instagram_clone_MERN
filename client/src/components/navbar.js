import React,{useContext,useRef,useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'



const Navbar=()=>{
  const searchModal=useRef(null)
  const[search,setSearch]=useState("")
  const[searchedUsers,setSearchedusers]=useState([])
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  const logout=()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    navigate('/signin')
    
  }
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const SearchUser=(query)=>{
    setSearch(query)
    fetch("/searchusers",{
        
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
       query})
    }).then(res=>res.json())
    .then(results=>{
      console.log(results)
      setSearchedusers(results.user)
    }).catch(err=>console.log(err))
  }
  const navList=()=>{
    if(state){
      return [ <li data-target="modal1" className='large material-icons modal-trigger' style={{fontSize:"30px"}}><ion-icon name="search-outline"></ion-icon></li>,
      <li><Link to="/profile">My Profile</Link></li>,
      <li><Link to="/createPost">New Post</Link></li>,
      <li><Link to="/myposts">My Posts</Link></li>,
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
<div className="nav-wrapper">
  <Link to={state?"/":"/signin"} className="brand-logo left">Dupligram</Link>
  <ul id="nav-mobile" className="right hide-on-med-and-down navlinks">
   {navList()}
  </ul>
</div>

<div id="modal1" className="modal" ref={searchModal} style={{color:"white"}}>
    <div className="modal-content" style={{backgroundColor:"black",color:"white"}}>
    <input style={{color:"white"}} type="text" placeholder="search users" value={search} onChange={(e)=> SearchUser(e.target.value)}/>
    <ul className="collection" >
    {searchedUsers.map(item=>{
     if(item._id!=state._id) {
      return <Link to={"/user/"+item._id} onClick={()=>{
           M.modal.getInstance(searchModal.current).close()
         }}>
         <li className="collection-item">{item.username}</li>
         </Link> 
     }
        
    })}
     
     
    </ul>
            
    </div>
  
  </div>
</nav>}

export default Navbar