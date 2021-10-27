const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const PostSchema= new Schema({
    name:{type:String,required:true},
    description:{type:String},
    image:{type:String,required:true},
    location:{type:String,required:true},
    likes:{type:Number},
    likedusers:[{type:mongoose.Types.ObjectId,ref:"User"}],
    date:{type: Date, default: Date.now},
    user:{type:mongoose.Types.ObjectId,ref:"User"}
})
const Post=mongoose.model("Post",PostSchema);
module.exports=Post;