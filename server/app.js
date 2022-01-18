require("dotenv").config()
const express= require('express')
const mongoose=require('mongoose')
const app=express()
const PORT=process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
})



require("./models/user")
require("./models/post")

app.use(require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/user"))
app.listen(PORT,()=>console.log("server up at 3000"))