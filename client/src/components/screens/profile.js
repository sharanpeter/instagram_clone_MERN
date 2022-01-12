import React, { useEffect,useState,useContext } from 'react'
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
            //   console.log(result)
             setData(result)
        })
        
    },[])
    
return  (
    <div className="profile">
   
     <div  className="profile-header">
        <div className="prof-pic"><img src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png" height="200px" width="200px" /></div>
        <div>
            <h5> {state?state.name:"loading..."}</h5>
            <div className="prof-desc">
            <h6>3 posts</h6>
            <h6>4 followers</h6>
            <h6>5 following</h6>
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