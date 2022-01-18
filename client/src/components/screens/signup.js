import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'




const Signup=()=>{

const[password,setPassword]=useState("")
const[name,setName]=useState("")
const[username,setUsername]=useState("")
const[email,setEmail]=useState("")
const navigate=useNavigate()
const PostData=()=>{

    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "invalid email",classes:"#ff5252 red accent-2"})    
        return
    }
    fetch("/signup",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name,
            email,
            username,
            password
        })
    }).then(res=>res.json()) .catch(err=>console.log(err))
    .then(data=>{
        if (data.error){
            M.toast({html: data.error,classes:"#ff5252 red accent-2"})
        }
        else{
            M.toast({html: "Signed up successfully!\nPlease login",classes:"#039be5 light-blue darken-1"})
            navigate("/signin")
        }
    }).catch(err=>console.log(err))

    // console.log(name,password,email)
}
//
return (
    <div>
   
    <div className="card input-field">
<h2>Signup</h2>
<input  type="text" placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
<input  type="text" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
<input  type="text" placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
<input  type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
<button className="btn #3f51b5 indigo" type="submit" onClick={()=>PostData()}>Submit</button>
<h5>Already have an account?<br/>
<Link to="/signin">Login</Link></h5>

</div>
</div>
)}

export default Signup