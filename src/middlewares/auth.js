
const jwt = require('jsonwebtoken');
const User =require("../models/user");


const adminAuth = (req, res, next) =>{
const token ="xyz";
    const isAdminAuthorized =token =="xyz"

    if(!isAdminAuthorized){    
    res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}

const userAuth = (req, res, next) =>{
const token ="xyzi";
    const isAdminAuthorized =token =="xyz"

    if(!isAdminAuthorized){    
    res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}

const userMailPassAuth =async (req,res,next) =>{
    try{
    //Read the token from the req cookies
    console.log("userMailPassAuth calling");
     const {token} =req.cookies;
     if(!token){
        throw new Error ("Token is not valid !!!")
     }
     const decodeObj = await jwt.verify(token, "DEV@Tinder$790");
     console.log("decodeObj"+decodeObj);
     const { id } =decodeObj;

     const user =await User.findById(id);
     console.log(user);
     if(!user){
        throw new Error ("User not found")
     }

     req.user =user;

     next();
    }catch(err){
        res.status(400).send("ERROR userMailPassAuth : "+err.message);

    }

        
     

    //validate the token

    //Find the user

}

module.exports ={adminAuth,userAuth,userMailPassAuth}