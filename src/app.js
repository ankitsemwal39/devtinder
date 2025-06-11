const express =require('express');

const app = express();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');

//DB call
const connectDB =require("./config/database")
const User =require("./models/user")
const {validateSignUpData} =require("./utils/validation")
const {userMailPassAuth} =require("./middlewares/auth");
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser())




//login
app.post("/login",async(req,res)=>{

    try{
        const {emailID, password} =req.body;        
        const user = await User.findOne({emailID :emailID});
        if(!user){
            throw new Error("Email id is invalid")
        }


        // Load hash from your password DB.
        // const  isPasswordValid =  bcrypt.compare(password, user.password);
        const  isPasswordValid =  await user.validatePassword(password);
        // result == true
            console.log("isPasswordValid : "+isPasswordValid);
            if(isPasswordValid){
                //Create a JWT Token
              /*  const token = await jwt.sign({id:user._id}, "DEV@Tinder$790",{expiresIn:"1h"})
                console.log("token : ",token);
                */
                //new
                const token = await user.getJWT();

                //Add the token to cookie and send the respse back to user.
                res.cookie("token",token, { expires: new Date(Date.now() + 900000), httpOnly: true });

                res.send("Login Successfull!!!")
            }else{
            throw new Error("Password is not Valid");
        }

      }catch(err){
         res.status(400).send("ERROR :  " + err.message);

    }
})


//profile
app.get("/profile",userMailPassAuth,async(req,res)=>{
try{
  
const user = req.user;
  res.send(user);
  }catch(err){
         res.status(400).send("ERROR :  " + err.message);

    }
})


app.post("/sendConnectionRequest",userMailPassAuth,async(req,res) =>{

    const user = req.user;
    //sending the sendConnectionRequest
    console.log("sending the sendConnectionRequest")
    res.send(user.firstName +" sending the sendConnectionRequest");
});






connectDB()
.then(()=>{
    console.log("Database connection established..");
    app.listen(3000,() =>{
    console.log("server is automatically listening on port 3000 ");
})
})
.catch(()=>{
console.error("Database cannot be connected")
});