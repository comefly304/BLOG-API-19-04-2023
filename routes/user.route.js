const UserRoute=require('express').Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User=require('../models/user.model')


//register user
UserRoute.post("/register",async(req,res)=>{
    try{
   const {username,email,password}=req.body
   const hash=await bcrypt.hash(password,10)

   const newuser=new User({
    username,
    email,
    password:hash
   })
   try{
     await newuser.save()
     return res.json({
        msg:"user registered successfully...,please login",
        user:newuser
     })
   }catch(err){
    return res.send(err)
   }
    }catch(err){
        return res.send(err)
    }
})


//login
UserRoute.post("/login",async(req,res)=>{
    try{
  const {email,password}=req.body

  const user=await User.findOne({email:email})
   bcrypt.compare(password,user.password,function(err,result){
    if(err){
        return res.send(err)
    }if(result){
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
        const {password,...others}=user._doc;
        return res.json({
            msg:"login successful...",
            token:token,
            user:others
        })
    }
  })
    }catch(err){
        return res.send(err)
    }
})



//get 
UserRoute.get("/get",async(req,res)=>{
    try{
     const user=await User.find()
     return res.json(user)
    }catch(err){
        return res.send(err)
    }
})

//get by id 
UserRoute.get("/get/:id",async(req,res)=>{
    try{
        const {id}=req.params
     const user=await User.findById(id)
     const {password,...others}=user._doc;
     return res.json(others)
    }catch(err){
        return res.send(err)
    }
})


//update
UserRoute.put("/update/:id",async(req,res)=>{
    try{
       if(req.params.id===req.body.userId){
        const user=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{
            new:true
        })
        const {password,...others}=user._doc;
        return res.json({
            msg:"updated successfull",
            user:others
        })
       }
    }catch(err){
        return res.send(err)
    }
})


//delete
UserRoute.delete("/delete/:id",async(req,res)=>{
    try{
        // const euser=await User.findById(req.params.id)

       if(req.params.id===req.body.userId){
        await User.findByIdAndDelete(req.params.id)
        return res.json({
            msg:"deleted successfull",
        })
       }
    }catch(err){
        return res.send(err)
    }
})



module.exports=UserRoute


