const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String,
    pic:{
        type:String,
        default:"https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
    },
    followers:[{
      type:ObjectId,ref:"User"
    }],
    following:[{
        type:ObjectId,ref:"User"
      }]
})

mongoose.model("User",userSchema)