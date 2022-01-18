const express=  require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const mongoose=require('mongoose')
const Post=mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())


router.post("/createpost",requireLogin,(req,res)=>{
    const {caption,url} = req.body
    console.log(caption,url)
    if(!caption || !url){
     return   res.status(422).json({error:"fill all fields"})

    }
    else{

        
      const post = new Post({
          caption,
          postedBy:req.user,
          Pic:url
        })

       post.save().then(result=>{
        //    if(err){
        //        res.send(err)
        //    }
        //    else {
               res.send(result)
        //    }
       })
       .catch(err=>console.log(err))
    }
})


router.get("/allposts",(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(foundposts=>{
        res.send(foundposts)
    })
    .catch(err=>console.log(err))
})



router.get("/followingposts",requireLogin,(req,res)=>{
    // console.log(req.user.name)
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(foundposts=>{
        res.send(foundposts)
    })
    .catch(err=>console.log(err))
})

router.get("/myposts",requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name pic")
    .then(foundposts=>{
        res.send(foundposts)
    })
    .catch(err=>console.log(err))
})

router.put("/like",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
       },{
           new:true
       }).populate("postedBy","_id name pic")
       .populate("comments.postedBy","_id name pic")
       .exec((err,result)=>{
           if(err){
               return res.status(422).json({error:err})
           } else{
               res.json(result)
           }
       })

    
})


router.put("/unlike",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        
     $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        } else{
            res.json(result)
        }
    })
    
})

router.put("/comment",requireLogin,(req,res)=>{
    const comment= {
          text:req.body.text,
          postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
       
        $push:{comments:comment}
       },{
           new:true
       }).populate("comments.postedBy","_id name picl")
       .populate("postedBy","_id name")
       .exec((err,result)=>{
           if(err){
               return res.status(422).json({error:err})
           } else{
               res.json(result)
           }
       })

    
})


router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err){
          return  res.json({error:err})
        }
      
          if(post.postedBy._id.toString()==req.user._id.toString()){
              post.remove()
              .then(result=>{
                  console.log(result)
                  res.json(result)
              })
              .catch(err=>console.log(err))
          }
        
    })
})

router.delete('/deletecomment/:postId/:commentId',requireLogin,(req,res)=>{
  
    Post.findByIdAndUpdate(req.params.postId,{
        
        $pull:{comments:{_id:req.params.commentId}}
       },{
           new:true
       }).populate("postedBy","_id name")
       .populate("comments.postedBy","_id name")
       .exec((err,result)=>{
           if(err){
               return res.status(422).json({error:err})
           } else{
               console.log(result)
               res.json(result)
           }
       })
    })

module.exports=router