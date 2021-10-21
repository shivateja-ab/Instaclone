const express=require("express");
const Post=require("../model/post");
const router=express.Router();
router.get('/',async function(req,res){
    try{
        const posts=await Post.find();
        return res.json({
            status:"success",
            data:{
                posts
            }
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

router.post('/',async function(req,res){
    try{
        const {title,body,image}=req.body;
        const post= await Post.create( {user:req.user,title, body, image});
        res.json({
            status:"success",
            data:{
                post
            }
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

router.put('/:id',async function(req,res){
    try{
        const {title,body,image}=req.body;
        const post = await Post.findOne({_id:req.params.id});
        if(!post){
            return res.status(404).json({
                status:"failed",
                message:"post not found"
            })
        }
        if(String(post.user)!==req.user){
            return res.status(403).json({
                status:"failed",
                message:"forbidden action"
            })
        }
        if(image){
            await Post.updateOne({_id:req.params.id},{
                image
            });
        }
        if(title){
            await Post.updateOne({_id:req.params.id},{
                title
            });
        }
        if(body){
            await Post.updateOne({_id:req.params.id},{
                body
            });
        }
        
        res.json({
            status:"success",
            message:post
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

router.delete('/:id',async function(req,res){
    try{
        const {title}=req.body;
        const post = await Post.findOne({_id:req.params.id});
        if(!post){
            return res.status(404).json({
                status:"failed",
                message:"post not found"
            })
        }
        if(String(post.user)!==req.user){
            return res.status(403).json({
                status:"failed",
                message:"forbidden action"
            })
        }
        await Post.deleteOne({_id:req.params.id});
        res.json({
            status:"success"
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports=router;