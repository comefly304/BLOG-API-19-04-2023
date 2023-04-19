const PostRoute=require('express').Router()
const bcrypt=require('bcrypt')
const Post=require('../models/post.model')


//create user
PostRoute.post("/create",async(req,res)=>{
    try{
   const {title,desc,username}=req.body
  
   const newpost=new Post({
    title,
    desc,
    username
   })
   try{
     await newpost.save()
     return res.json({
        msg:" post created successfully",
        post:newpost
     })
   }catch(err){
    return res.send(err)
   }
    }catch(err){
        return res.send(err)
    }
})


//get 
PostRoute.get("/get",async(req,res)=>{
    try{
     const post=await Post.find()
     return res.json(post)
    }catch(err){
        return res.send(err)
    }
})

//get by username 
PostRoute.get("/get/:username",async(req,res)=>{
    try{
        const {username}=req.params
     const post=await Post.findOne({username:username})
     return res.json(post)
    }catch(err){
        return res.send(err)
    }
})


//update
PostRoute.put("/update/:id",async(req,res)=>{
    try{
       if(req.params.id===req.body.postId){
        const post=await Post.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{
            new:true
        })
        return res.json({
            msg:"updated successfully",
            post:post
        })
       }
    }catch(err){
        return res.send(err)
    }
})


//delete
PostRoute.delete("/delete/:id",async(req,res)=>{
    try{
        // const euser=await User.findById(req.params.id)

       if(req.params.id===req.body.postId){
        await Post.findByIdAndDelete(req.params.id)
        return res.json({
            msg:"deleted successfull",
        })
       }
    }catch(err){
        return res.send(err)
    }
})


module.exports=PostRoute