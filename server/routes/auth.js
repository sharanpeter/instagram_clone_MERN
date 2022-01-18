require("dotenv").config()
const express=  require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const requireLogin = require('../middleware/requireLogin')
const jwt=require('jsonwebtoken')
const User =mongoose.model("User")
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())




router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
   

  if(!name || !password || !email){
      res.status(422).json({error:"please fill in all the fields"})
       }
  else{
  
   
 
  User.findOne({email:email})
  .then((savedUser)=>{
      if (savedUser){
      res.json({error:"User already exists"}).status(422)
    
    }
    
     else {
         bcrypt.hash(password,12)
         .then( hashedpass=> {
            const user = new User({
                name:name,
                email:email,
                password:hashedpass
            })
          
            user.save()
            .then(()=>res.json({message:"saved user"}))
            .catch(err=>console.log(err))
          } )
       
    }
  }
 )
  .catch(err=>console.log(err))
}
})



router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    
  if(!password || !email){
      res.status(422)
      res.json({error:"please fill in all fields"})}
  else{
  

  User.findOne({email:email})
  .then((savedUser)=>{
      if (savedUser){
        bcrypt.compare(password,savedUser.password)
        .then((trueres)=>{
            if(trueres){
                
                 const token =jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
                 const{_id,email,name,pic,followers,following}=savedUser
                 res.json({token,user:{_id,email,name,pic,followers,following}})
                  }
            else{res.json({error:"enter valid password"})}
            })
        .catch(err=>console.log(err))
    }
     else {
         
         res.json({error:"user not found signup pls"}).status(422)
       
    }
  }
 )
  .catch(err=>console.log(err))
}
})
module.exports=router
