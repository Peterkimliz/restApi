const http=require("http");
const port=process.env.PORT||9000
const app=require("./app");

const server=http.createServer(app);

server.listen(port,()=>{
    console.log("Server running on port:http://127.0.0.1:9000");
})