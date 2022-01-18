import React, { useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext } from "../../App"

const UpdatePfp=()=>{
    const[image,setImage]=useState("")
    const[url,setUrl]=useState("")
    const navigate=useNavigate()
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        if(url){
            fetch("/updateprofilepic",{
                method:"post",
                headers:{"Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    
                    url
                })
            }).then(res=>res.json())
                .then(data=>{
                   
                    if (data.error){
                        M.toast({html: data.error,classes:"#ff5252 red accent-2"})
                    }
                    else{
                        M.toast({html: "Updated successfully!",classes:"#039be5 light-blue darken-1"})
                        navigate("/profile")
                    }
                }).catch(err=>console.log(err))
               
        }
    },[url])
    const postDetails= ()=>{

 
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","fredeter")
      
        
        fetch("https://api.cloudinary.com/v1_1/fredeter/image/upload", {
        method:"post",
        body:data
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATEPIC",
                     payload:data.url})
            localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            setUrl(data.url)})
        .catch(err=>console.log(err))
        // console.log(caption)
       
            
        
    }

        return (
    <div className='card input-filled'>
    <div className="file-field input-field">
      <div className="btn #3f51b5 indigo">
        <span>Upload Image</span>
        <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" />
      </div>
    </div>
    <button className="btn #3f51b5 indigo" type="submit" onClick={()=>postDetails()}>Submit</button>
    </div>
    )}


















export default UpdatePfp