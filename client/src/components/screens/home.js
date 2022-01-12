
import React, { useEffect, useState,useContext } from 'react'

import {UserContext } from "../../App";




const Home=()=>{
    const [data,setData]=useState([])
    const [text,setComment]=useState("")
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/allposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //  console.log(result)
            setData(result)
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

 return(
     
     
     <div className="home">
        {data.map(item=>{
         return(
        <div className="home-card" key={item._id}>
     <div className="home-card-header">
     <img className="prof-small-img" src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png" />
     <h6>{item.postedBy.name}</h6>
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
       
             
             
             
        
             
         </div>
         <div className="comments">
             <input className='comment-input' type="text" placeholder="add a comment" onChange={(e)=>{setComment(e.target.value)}}></input>
             <button type="button" className="btn comment-btn" onClick={()=>newComment(text,item._id)}>Post</button>
         </div>
         </div>
     )})}
    
     
   
        
         </div>
         
 )
}

export default Home