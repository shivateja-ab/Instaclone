const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const indexRoutes=require('./routes/index');
const postRoutes=require('./routes/posts');
const jwt = require('jsonwebtoken');
mongoose.connect("mongodb://localhost/instaclone");
 
app.use(cors());
app.use('/posts',function(req,res,next){
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if (!token){
            return res.status(401).json({
                status:"failed",
                message:"Not Authenticated"
            })
        }
        const decoded=jwt.verify(token,'Instaclone-secret');
        if(!decoded){
            return res.status(401).json({
                status:"failed",
                message:"Invalid token"
            })
        }
        console.log(decoded)
        req.user = decoded.data;
    }catch(e){
        res.json({
            status:'failed',
            message:e.message
        })
    }
    next();
})
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use("/",indexRoutes);
app.use("/posts",postRoutes);
app.listen("5000",()=>console.log("server listening on port 5000"))