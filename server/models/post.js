const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    caption:String,
    Pic:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    likes:[{type:ObjectId,ref:"User",unique:true}],
    comments:{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
    }
})

mongoose.model("Post",postSchema)