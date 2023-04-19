const mongoose=require('mongoose')


const PostSchema=new mongoose.Schema({
    title:{type:String,require:false},
    desc:{type:String,require:false},
    username:{type:String,require:true},

},{
    timestamps:true
})

const Post=mongoose.model("Post",PostSchema)

module.exports=Post