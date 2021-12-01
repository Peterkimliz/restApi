const mongoose=require("mongoose");

const ordersShema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true
    },
    productQuantity:{
        type:Number,
        required:true,
        default:1
    }
});

module.exports=mongoose.model("orders",ordersShema);