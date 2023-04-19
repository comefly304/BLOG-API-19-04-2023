const express=require('express')
const Connection = require('./config/db.connect')
const UserRoute = require('./routes/user.route')
const PostRoute = require('./routes/post.route')
const CategoryRouter = require('./routes/category.route')
require('dotenv').config()
const app=express()


app.use(express.json())
app.use("/user",UserRoute)
app.use("/post",PostRoute)
app.use("/category",CategoryRouter)




const PORT=8080
app.listen(PORT,async()=>{
   try{
    Connection()
    console.log(`server is listening on port ${PORT}`)
   } catch(err){
    console.log("could not able to connect to server")
   }
})