const express=require("express");
const router=express.Router()
const Product=require("../models/productsModel")
const orderController=require("../controlers/orderController");

////////////////////////////////route to get all orders////////////////////////////////////////////////////////////////
router.get("/",orderController.order_get_all);
/////////////////////////////////////route to post anew product///////////////////////////////////////////////////////
router.post("/",orderController.order_post);
///////////////////////////////////route to get a order by specific id//////////////////////////////////////
router.get("/:orderId",orderController.order_get_specific);
///////////////////////////////////route to delete a order by specific id//////////////////////////////////////
router.delete("/:orderId",orderController.order_delete);

module.exports=router
