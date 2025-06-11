const express =require('express');

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth");
// why need middlware this is old way --
/*
app.get("/admin/getAllData",(req,res)=>{
    //check if the request is authorized
    //logic of checking
    const token ="xyz";
    const isAdminAuthorized =token =="xyzz"
    if(isAdminAuthorized){
    res.send("All Data Sent");
    res.status(200).send("OK");
    }else{
        res.status(401).send("no data Data Sent");
    }
})

app.get("/admin/getDeleted",(req,res)=>{
    //check if the request is authorized
    //logic of checking
     const token ="xyz";
    const isAdminAuthorized =token =="xyzz"
    if(isAdminAuthorized){
    res.send("All Data Sent");
    res.status(200).send("OK");
    }else{
        res.status(401).send("no data Data Sent");
    }
    res.send("Delete User");
})
*/
// how actul use Middelwere //HAndle auth Middleware for all request GET ,POST

app.use("/admin",
//     (req, res, next) =>{
// const token ="xyz";
//     const isAdminAuthorized =token =="xyz"

//     if(!isAdminAuthorized){    
//     res.status(401).send("Unauthorized request");
//     }else{
//         next();
//     }
// this commented function is inside the middleware .
adminAuth
  );
//  app.use("user",userAuth);

app.use("/user",userAuth,(req,res)=>{
    res.send("Getting data of user")
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
})
   

app.get("/admin/deletedUser",(req,res)=>{
    res.send("Delete a User");
});
   


//Error Handler

app.get("/getUserData",(req,res) =>{
    //logic of DB call and get user data
    // try {
        
    // } catch (error) {
        
    // }
    // throw new Error("jhghjg");
    res.send("User Data Sent");

});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
})



app.listen(3000,() =>{
    console.log("server is automatically listening on port 3000 ");
});