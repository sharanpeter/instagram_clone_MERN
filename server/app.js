require("dotenv").config()
const express= require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
const PORT=process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
})



require("./models/user")
require("./models/post")

app.use(cors("*"))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

if(process.env.NODE_ENV=='production'){
  app.use(express.static('client/build'))
}
app.use(require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/user"))
app.listen(PORT,()=>console.log("server up at 3000"))