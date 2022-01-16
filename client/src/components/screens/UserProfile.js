import React, { useEffect,useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import {UserContext } from "../../App"


const UserProfile=()=>{
    
    const [userProfile,setProfile]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    const {userid} =useParams()
    
    console.log(userid)
    useEffect(()=>{
        
    fetch(`/user/${userid}`,{
        
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(result=>{
            // console.log(result)
              setProfile(result)
             
        })
        .catch(err=>console.log(err))
        
    },[])
    console.log(userProfile)
return  (
    
 <>
    { userProfile ?  
    <div className="profile">
     <div  className="profile-header">
        <div className="prof-pic"><img src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png" height="200px" width="200px" /></div>
        <div>
            <h5> {userProfile.user.name}</h5>
            <div className="prof-desc">
            <h6>{userProfile.posts.length} posts</h6>
            <h6>4 followers</h6>
            <h6>5 following</h6>
            </div>
        </div>
     </div> 
     <div className="gallery">
     {userProfile.posts.map(item=>{
        return(
            
         <img className="gallery-img" src={item.Pic} />
       
         
    
        )
    })}
    </div>
    
    </div> :  <h2>Loading...</h2>
       
    }
    </>
)
}

export default UserProfile