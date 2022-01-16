const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    followers:[{
      type:ObjectId,ref:"User"
    }],
    following:[{
        type:ObjectId,ref:"User"
      }]
})

mongoose.model("User",userSchema)