import React, { useEffect,useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import {UserContext } from "../../App"


const UserProfile=()=>{
    
    const [userProfile,setProfile]=useState(null)
    

    const {state,dispatch}=useContext(UserContext)
    const {userid} =useParams()
    const [followed,setFollowed]=useState(state?!state.following.includes(userid):true)
    // console.log(userid)
    useEffect(()=>{
        
    fetch(`/user/${userid}`,{
        
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(data=>{
             console.log(data)
              setProfile(data)
             
        })
        .catch(err=>console.log(err))
        
    },[])

    const followUser=()=>{
        fetch("/follow",{
            
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
           followId:userid})
        }) .then(res=>res.json())
        .then(result=>{
            console.log(result)
            dispatch({type:"UPDATE",
                     payload:{followers:result.followingUser.followers,following:result.followingUser.following}})
            localStorage.setItem("user",JSON.stringify(result.followingUser))

              setProfile((prevState)=>{
                  return { 
                      ...prevState,
                      user:{
                          ...prevState.user,
                          followers:[
                            ...prevState.user.followers,
                            result.followedUser.followers]
                      }
                     
                }
                  })
                  setFollowed(false)

            // setProfile(result.followedUser)
                  console.log(userProfile)
            
        })
        .catch(err=>console.log(err))
    }

    const unfollowUser=()=>{
       
        fetch("/unfollow",{
            
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
           unfollowId:userid})
        }) .then(res=>res.json())
        .then(result=>{
            console.log(result)
            dispatch({type:"UPDATE",
                     payload:{followers:result.followingUser.followers,following:result.followingUser.following}})
            localStorage.setItem("user",JSON.stringify(result.followingUser))

              setProfile((prevState)=>{
                  const newFollowers=result.followedUser.followers.filter(item=>item!=result.followingUser._id)
                  return { 
                      ...prevState,
                      user:{
                          ...prevState.user,
                          followers:newFollowers
                      }
                     
                }
                  })
                  setFollowed(true)
                  console.log(userProfile)
            
        })
        .catch(err=>console.log(err))
    }
return  (
    
 <>
    { userProfile ?  
    <div className="profile">
     <div  className="profile-header">
        <div className="prof-pic"><img src={userProfile.user.pic} height="200px" width="200px" /></div>
        <div>
            <h5> {userProfile.user.name}</h5>
            <div className="prof-desc">
            <h6>{userProfile.posts.length} posts</h6>
            <h6>{userProfile.user.followers.length} followers</h6>
            <h6>{userProfile.user.following.length} following</h6>
            </div>
          { followed ?
            <button className="btn #3f51b5 indigo" type="submit" onClick={()=>followUser()}>Follow</button>
                :
                
               
             <button className="btn #3f51b5 indigo" type="submit" onClick={()=>unfollowUser()}>Unfollow</button> 
              }
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