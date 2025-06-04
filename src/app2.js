const express =require('express');

const app = express();

// Middlewares & Error Handlers
app.use("/user",(req,res,next) =>{
    //Route Handler
    // res.send("route handler 1")
    console.log("Handling the route user 1!!");
    // res.send("Response 1!!");
    next();
    
},
(req,res,next) =>{
    console.log("Handling the route user 2!!");
    // res.send("Response 2!!")
  next();
},
(req,res,next) =>{
    console.log("Handling the route user 2!!");
    res.send("Response 2!!")
    // next()
});



//middleware
app.get("/mid",(req,res,next)=>{
    next();
},
(req,res,next)=>{
    next();
},
(req,res,next)=>{
    res.send("2nd Router HAndler")
});








app.listen(3000,() =>{
    console.log("server is automatically listening on port 3000 ");
});