const express=require('express');
const router=express.Router();
const userController=require("../controlers/userController");

///////////////////////////////////////////////////route to create a new user////////////////////////////////////////////
router.post("/signup",userController.create_user);
/////////////////////////////////////////////////route to login a user/////////////////////////////////////////////////
router.post("/login",userController.login_user);
////////////////////////////////////////////////////route to delete user///////////////////////////////////////////////
router.delete("/:userId",userController.delete_user);

module.exports=router;