import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const CreatePost=()=>{
    const[caption,setCaption]=useState("")
    const[image,setImage]=useState("")
    const[url,setUrl]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{"Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    caption,
                    url
                })
            }).then(res=>res.json())
                .then(data=>{
                   
                    if (data.error){
                        M.toast({html: data.error,classes:"#ff5252 red accent-2"})
                    }
                    else{
                        M.toast({html: "Posted successfully!",classes:"#039be5 light-blue darken-1"})
                        navigate("/myposts")
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
        .then(data=>{setUrl(data.url)})
        .catch(err=>console.log(err))
        // console.log(caption)
       
            
        
    }

        return (
    <div className='card input-filled'>
    <input type="text"  placeholder="caption"  name='caption' value={caption} type="text" onChange={(e)=>setCaption(e.target.value)} />
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


















export default CreatePost