////////////////////imports////////////////////////////////////////////////////////////////
const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const productRoutes=require("./api/routes/products");
const ordersRoutes=require("./api/routes/orders");
const usersRoute=require("./api/routes/users");
const morgan=require("morgan");

//////////////////////////////establishing mongodb Connection///////////////////////////////

mongoose.connect(" mongodb://127.0.0.1:27017/Shop",(err)=>{
    if(!err){
        console.log("Connected to mongo database successfully");
    }
    else{
        console.log("failed to connect to mongo database");
    }
});


///////////////////////////////////////middlewares//////////////////////////////////////////
app.use(morgan("dev"));
app.use("/upload",express.static("upload"));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use("/products",productRoutes);
app.use("/orders",ordersRoutes);
app.use("/users",usersRoute);
//////////////////////////middlewares to handle errors////////////////////////////////////////
app.use((req,res,next)=>{
    const error=new Error("Not Found");
    error.status=404;
    next(error);});

app.use((error,req,res,next)=>{
    res.status(error.status|| 500);
    res.json({
        error:{
            message:error.message
        }});
    });

module.exports=app;