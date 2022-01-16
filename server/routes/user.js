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
    },(err,result)=>{
        if(err){
            return res.json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).then(result=>{
            res.json(result)
        }).catch(err=>console.log(err))
    })
   

})


router.put("/unfollow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        }).then(result=>{
            res.json(result)
        }).catch(err=>console.log(err))
    })
   

})









module.exports=router