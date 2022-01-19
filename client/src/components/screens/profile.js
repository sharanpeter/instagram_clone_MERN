import React, { useEffect,useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import {UserContext } from "../../App"



const Profile=()=>{
    
    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        
    fetch('/myposts',{
        
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
              console.log(result)
             setData(result)
        })
        
    },[])
    
return  (
    <div className="profile">
   
     <div  className="profile-header">
        <div className="prof-pic">
        <img src={state?state.pic:"..."} height="200px" width="200px" />
     <Link to="/updateprofilepic">  <button style={{borderRadius:"1px",fontSize:"30px",margin:"-20px -40px 5px 150px"}} className="btn #3f51b5 indigo" type="submit" >        <ion-icon name="camera-reverse-outline">upload profile pic </ion-icon>
</button>
</Link> 

        </div>
        <div>
            
            <h5 style={{fontWeight:"600"}}> {state?state.username:"loading..."}</h5>
            <h6> {state?state.name:"loading..."}</h6>
            <div className="prof-desc">
            <h6>{data.length} posts</h6>
            <h6>{state?state.followers.length:0} followers</h6>
            <h6>{state?state.following.length:0} following</h6>
            </div>
        </div>
     </div> 
     <div className="gallery">
     {data.map(item=>{
        return(
            
         <img className="gallery-img" src={item.Pic} />
       
         
    
        )
    })}
    </div>
    </div>
)
}

export default Profile