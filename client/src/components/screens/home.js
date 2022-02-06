
import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom';

import {UserContext } from "../../App";




const Home=()=>{
    const [data,setData]=useState([])
    const [userData,setUserData]=useState([])
    const [text,setComment]=useState("")
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/followingposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
              console.log(result)
            setData(result)
        })

        fetch('/allusers',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
              console.log(result)
            setUserData(result.users)
        })
    },[])

    const likePost=(postId)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({postId})
        }).then(res=>res.json())
        .then(result=>{
          const updatedData= data.map(item=>{
              if(item._id==result._id){
                  return result
              }
              else{
                  return item
              }
          })
          setData(updatedData)
        })
        .catch(err=>console.log(err))
      
    }
    const unlikePost=(postId)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({postId})
        }).then(res=>res.json())
        .then(result=>{
            const updatedData= data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(updatedData)
          })
        .catch(err=>console.log(err))

    }
    const newComment=(text,postId)=>{
        fetch("/comment",{
            
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
            postId,
            text})
        }) .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const updatedData= data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(updatedData)
        })
        .catch(err=>console.log(err))
    }


    const deletePost=(postId)=>{
        fetch(`/deletepost/${postId}`,{
            
            method:"delete",
            headers:{
                
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
           
        }) .then(res=>res.json())
        .then(result=>{
            
            const updatedData= data.filter(item=>{
                
                    return item._id !== result._id
                
              
            })
            setData(updatedData)
        })
        .catch(err=>console.log(err))
    } 

    const deleteComment=(postId,commentId)=>{
        fetch(`/deletecomment/${postId}/${commentId}`,{
            
            method:"delete",
            headers:{
                
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
           
        }) .then(res=>res.json())
        .then(result=>{
            
            const updatedData= data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(updatedData)
              
           
        })
        .catch(err=>console.log(err))
    } 

 return(
     
     
     <div className="home">

     
     
        { state && state.following.length > 0 ?
               data.map(item=>{
         return(
        <div className="home-card" key={item._id}>
     <div className="home-card-header">
     <img className="prof-small-img" src={item.postedBy.pic}/>
     
     <h6 ><Link style={{color:"white"}} to={item.postedBy._id!==state._id ? "/user/"+item.postedBy._id : "/profile"}>{item.postedBy.username}</Link></h6>
     {item.postedBy._id==state._id  &&  
     <p onClick={()=>deletePost(item._id)} className='delete-icon'><ion-icon name="trash-outline"></ion-icon> </p> }
   
     </div>

        
         <img className="card-img" src={item.Pic} />
     
     <div className="card-content">
     {item.likes.includes(state._id)
      ? 
    <p onClick={()=>unlikePost(item._id)}><ion-icon  name="heart"></ion-icon></p> 
      :
     <p onClick={()=>likePost(item._id)}><ion-icon name="heart-outline"></ion-icon></p> 
     }
         
         
         <h6>{item.likes.length } likes</h6>
         <h6>{item.caption}</h6>
         {
             item.comments.map(comment=>{
               return  <h6><span className='comment-name' key={comment._id}>{comment.postedBy.username} &nbsp;</span>{comment.text} 
               { comment.postedBy._id==state._id &&
               <span onClick={()=>deleteComment(item._id,comment._id)} style={{position:"absolute",right:"475px"}}><ion-icon name="close-outline"></ion-icon></span>
               }
               </h6>
             })
         }
             
             
             
        
             
         </div>
         <div className="comments">
             <input className='comment-input' type="text" placeholder="add a comment" onChange={(e)=>{setComment(e.target.value)}}></input>
             <button type="button" className="btn comment-btn" onClick={()=>newComment(text,item._id)}>Post</button>
         </div>
         </div>
         )})   
     
    
     :
     <div>
    
     <h2>Users you may know:</h2>
     { userData ? userData.slice(1,4).map(item=>{
      return   <div class="card recommendcard">
     
     <div class="card-image waves-effect waves-block waves-light dark">
       <img class="activator" src={item.pic} />
     </div>
     <div class="card-content">
       <span class="card-title activator  text-darken-4">{item.username}</span>
       <button type="button" className="btn comment-btn"> <Link style={{color:"white"}} to={ "/user/"+item._id }>View Profile</Link></button>
     </div>
      
   </div>
     })
     :
     <h2>Loading</h2>
    
     }
     </div>
     
         
     }
    
     
      


        
         </div>
         
 )
}

export default Home