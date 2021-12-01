const mongoose=require("mongoose");
const Product=require("../models/productsModel");

exports.product_get_all=(req,res,next)=>{
    Product.find()
    .select('productName productPrice _id productImage')
    .exec()
    .then(doc=>{
        const response={
            count:doc.length,
            product:doc.map(doc=>
                {
                    return{
                        productName:doc.productName,
                        productPrice:doc.productPrice,
                        productImage:doc.productImage,
                        _id:doc._id,

                        request:{
                            type:"GET",
                            url:"http://localhost:9000/products"+doc._id
                        }
                    }
                })
               }
        res.status(200).json(response);
    })
    .catch(err=>{
       res.status(500).json({error:err});
    });
}

exports.product_post=(req,res,next)=>{
    const product=new Product({
        _id:mongoose.Types.ObjectId(),
        productName:req.body.name,
        productPrice:req.body.price,
        productImage:req.file.path });
    product.save()
    .then(result=>{
        console.log(result)
        res.status(200).json({
            message:"Created post successfully",
            createdProduct:{
                productName:result.productName,
                productPrice:result.productPrice,
                _id:result._id,
                request:{
                    type:"GET",
                    url:"http://localhost:9000/products"+result._id
                }
            }
        });

        }).catch(err=>{
            res.status(500).json({error:err});
        });  
  }


exports.product_get_specific=(req,res,next)=>{
    const id=req.params.productId
    Product.findById(id)
    .select('productName productPrice _id productImage')
    .exec()
    .then(doc=>{
      if(doc){
      res.status(200).json({product:doc});
      }else{
        res.status(404).json({
            message:"No document with that id"
        });
      }
    })
    .catch(err=>{
       res.status(500).json({error:err})
    });
}  


exports.product_patch=(req,res,next)=>{
    const id=req.params.productId;
    const updatedOps={};
    for(const ops of req.body){
        updatedOps[ops.propName]=ops.value
    }
    Product.update({ _id:id},{$set:updatedOps})
    .exec()
    .then(data=>{
       res.status(200).json(data);
    })
    .catch(err=>{
      res.status(500).json({error:err})
    });
}


exports.product_delete=(req,res,next)=>{
    const id=req.params.productId
    Product.remove({ _id:id})
    .exec()
    .then(data=>{
       res.status(200).json(data);
    })
    .catch(err=>{
     res.status(500).json({error:err})
    });
   
}