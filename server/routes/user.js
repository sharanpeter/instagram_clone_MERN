const express=  require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const mongoose=require('mongoose')
const Post=mongoose.model("Post")
const User=mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())







router.get("/user/:userid",requireLogin,(req,res)=>{
    User.findOne({_id:req.params.userid})
    .select("-password")
    .then(user=>{
       Post.find({postedBy:req.params.userid})
       .populate("postedBy","name _id")
       .exec((err,posts)=>{
           if(err){
             return  res.json({error:err}).status(422)
           }
           res.json({user,posts})
       })
    })
    .catch(err=>res.json({error:"User not found"}).status(404))

})


router.put("/follow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,followedUser)=>{
        if(err){
            return res.json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).select("-password").then(followingUser=>{
            res.json({followedUser,followingUser})
        }).catch(err=>console.log(err))
    }).select("-password")
   

})


router.put("/unfollow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,followedUser)=>{
        if(err){
            return res.json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        }).select("-password").then(followingUser=>{
            res.json({followedUser,followingUser})
                }).catch(err=>console.log(err))
            }).select("-password")
   

})



router.post("/updateprofilepic",requireLogin,(req,res)=>{
 User.findByIdAndUpdate(req.user._id,{
     pic:req.body.url
 },{
     new:true },
 (err,result)=>{
  if(err){
      console.log(err)
  }
  res.json(result)

 })
})


router.post("/searchusers",requireLogin,(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({username:{$regex:userPattern}})
    .select("_id username pic")
    .then(user=>{
        res.json({user})
    }).catch(err=>console.log(err))
})

router.get("/allusers",requireLogin,(req,res)=>{
   
    User.find()
    .select("_id username pic")
    .then(users=>{
        res.json({users})
    }).catch(err=>console.log(err))
})










module.exports=router