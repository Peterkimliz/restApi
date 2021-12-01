const express=require("express");
const router=express.Router()
const multer=require('multer');
const productController=require("../controlers/productController");

var storage =multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploads');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
const fileFilter=(req,file,callback)=>{
    if(file.mimetype==="/image/jpeg"||file.mimetype==="/image/png"||file.mimetype==="/image/jpg"){
        callback(null,true);
    }else{
        callback(null,true);
    }
}

const upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*5},
    fileFilter:fileFilter
});

router.get("/",productController.product_get_all);
///////////////////////////////////route to POST a product by specific id//////////////////////////////////
router.post("/",upload.single('productImage'),productController.product_post);
///////////////////////////////////route to get a product by specific id//////////////////////////////////////
router.get("/:productId",productController.product_get_specific);
///////////////////////////////////route to update a product by specific id//////////////////////////////////////
router.patch("/:productId",productController.product_patch);

///////////////////////////////////route to delete a product by specific id//////////////////////////////////////
router.delete("/:productId",productController.product_delete);

module.exports=router
