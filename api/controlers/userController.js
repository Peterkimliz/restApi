const bycrypting=require('bcrypt');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Users=require('../models/userModel');


exports.create_user=function(req,res,next){
    Users.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json(
                {message:"email already register try another email"})
             }
        else{
            bycrypting.hash(req.body.password,10,(err,hash)=>{
                if(err){
                 return res.status(500).json(
                     {error:err }
                     );
                }
                else{
                    const user=new Users({
                        email:req.body.email,
                        _id:mongoose.Types.ObjectId(),
                        password:hash
                    });
                   user.save()
                   .then(result=>{
                       res.status(201).json({
                           message:"user created",
                           user:result
                         });
 
                   })
                   .catch(err=>{
                     res.status(500).json(
                         {error:err }
                         );
                      }); 
                     }
                 });
              }
             })
    .catch(err=>{
        res.status(500).json(
            {error:err }
            );
    });
 }

 exports.login_user=(req,res,next)=>{
    Users.find({email:req.body.email})
    .exec()
    .then(user=>{
     if(user.length<1){
            return res.status(401).json(
                {message:"Authentication failed"});
             }
        bycrypting.compare(req.body.password,user[0].password,(err,result)=>{
             if(err){
                return res.status(401).json(
                    {message:"Authentication failed"});
             }
             if(result){
                    const token=jwt.sign({
                        email:user[0].email,
                        userId:user[0]._id
                    },
                    "secret",
                    {
                        expiresIn:"1h"
                    }
                    )              
                return res.status(200).json(
                    {
                        message:"Authentication Successfull",
                        token:token
                    });

             }
             res.status(401).json(
                {message:"Authentication failed"});
               });     

    })
    .catch(err=>{
        res.status(500).json(
            {error:err }
            );
    });
}

exports.delete_user=(req,res,next)=>{
    const id=req.params.userId;
    Users.remove({_id:id})
    .exec()
    .then(result=>{
          res.status(200).json({
                message:"user deleted"});
  
        
    })
    .catch(err=>{
        res.status(500).json(
            {error:err }
            );
    });
 

}