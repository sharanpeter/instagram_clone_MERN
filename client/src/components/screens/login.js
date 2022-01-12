import React,{useState,useContext} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Navbar from '../navbar'
import {UserContext} from '../../App'
import M from 'materialize-css'



const Login=()=>{

    const {state,dispatch}=useContext(UserContext)
    const navigate = useNavigate()
    const[password,setPassword]=useState("")
    
    const[email,setEmail]=useState("")
    
    const PostData=()=>{

 
        fetch("/signin",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              
                email,
                password
            })
        }).then(res=>res.json()).catch(err=>console.log(err))
        .then(data=>{
            console.log(data)
            if (data.error){
                M.toast({html: data.error})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Signed in successfully!",classes:"#039be5 light-blue darken-1"})
                navigate("/")
            }
        }) .catch(err=>console.log(err))
    
        // console.log(password,email);
    }
return (
    <div>
 

    <div className="card input-field">
        <h2>Sign in</h2>
        <input  type="text" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input  type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button className="btn #3f51b5 indigo" type="submit" onClick={()=>PostData()}>Submit</button>
        <h5>Don't have an account?<br/>
        <Link to="/signup">Register</Link></h5>
    </div>
    </div>
)
}

export default Login