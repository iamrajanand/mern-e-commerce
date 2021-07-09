const mongoose=require('mongoose');

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    },
    

},{timestamps:true}); // we will filter elements using this

module.exports=mongoose.model("Category",categorySchema);
