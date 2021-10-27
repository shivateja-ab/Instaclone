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
        const {name,description,image,location}=req.body;
        const post= await Post.create( {user:req.user,name, description, image, location});
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
        const {name,description,image}=req.body;
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
        if(name){
            await Post.updateOne({_id:req.params.id},{
                name
            });
        }
        if(description){
            await Post.updateOne({_id:req.params.id},{
                description
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
        const {name}=req.body;
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
router.put('/:id/like',async function (req,res){
    try{
        const {Id}=req.body;
    const post=await Post.findOne({_id:req.params.id});
    if(!post){
        res.json({
            status:"failed",
            message:"post not found"
        })
    }
    await Post.updateOne({_id:req.params.id},{$push:{likedusers:Id}},{new:true});
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

router.put('/:id/unlike',async function (req,res){
    try{
        const {Id}=req.body;
    const post=await Post.findOne({_id:req.params.id});
    if(!post){
        res.json({
            status:"failed",
            message:"post not found"
        })
    }
    await Post.updateOne({_id:req.params.id},{$pull:{likedusers:Id}},{new:true});
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


module.exports=router;