const mongoose=require("mongoose");
const Order=require("../models/ordersModel");

exports.order_get_all=(req,res,next)=>{
    Order.find()
    .select("_id product productQuantity")
    .populate("product","_id productName productPrice")
    .exec()
    .then(doc=>{
        const response={
            count:doc.length,
            orders:doc.map(doc=>{
                return{
                    _id:doc._id,
                    product:doc.product,
                    productQuantity:doc.productQuantity,
                    request:{
                     type:"GET",
                     url:"http://localhost:9000/orders/"+doc._id
                 }
 
                }
            })
        }
        res.status(200).json(response);
 
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        });
    });
 }

exports.order_post=(req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product=>{
        if(!product){
            return res.status(404).json({
                message:"Order not found"
            })
        }
        const order=new Order({
            _id:mongoose.Types.ObjectId(),
            productQuantity:req.body.quantity,
            product:req.body.productId
        });
       return order.save()
    })
    .then(result=>{
        res.status(201).json({
            message:"order stored",
            createdOrder:{
                _id:result._id,
                product:result.product,
                productQuantity:result.productQuantity
            },
            request:{
             type:"GET",
             url:"http://localhost:9000/orders/"+result._id
         }
         });
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
     
}

exports.order_get_specific=(req,res,next)=>{
    const id=req.params.orderId
    Order.findById(id)
    .select("_id product productQuantity")
    .populate("product","_id productName productPrice")
    .exec()
    .then(doc=>{
        if(!doc){
            return res.status(404).json({
                message:"order not found"
            });
        }
         res.status(200).json({
            _id:doc._id,
            product:doc.product,
            productQuantity:doc.productQuantity,
            request:{
             type:"GET",
             url:"http://localhost:9000/orders/"
         }
         });
     
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        });
    });

}

exports.order_delete=(req,res,next)=>{
    const id=req.params.orderId
    Order.remove({ _id:id})
    .exec()
    .then(data=>{
       res.status(200).json(data);
    })
    .catch(err=>{
     res.status(500).json({error:err})
    });
}
