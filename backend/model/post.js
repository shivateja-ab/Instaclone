const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const PostSchema= new Schema({
    title:{type:String,required:true},
    body:{type:String},
    image:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,ref:"User"}
})
const Post=mongoose.model("Post",PostSchema);
module.exports=Post;