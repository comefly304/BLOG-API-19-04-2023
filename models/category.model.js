const mongoose=require('mongoose')


const CategorySchema=new mongoose.Schema({
    type:{type:String,require:true},
},{
    timestamps:true
})

const Category=mongoose.model("Category",CategorySchema)

module.exports=Category