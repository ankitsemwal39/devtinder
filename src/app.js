const express =require('express');

const app = express();

//DB call
const connectDB =require("./config/database")
const User =require("./models/user")
app.post("/signup",async(req,res)=>{
    const userObj= {
    "firstName": "Rahul",
    "lastName": "Yadav",
    "emailID": "rahul.yadav@example.com",
    "password": "rahul@123",
    "age": 31,
    "gender": "Male",
    "phoneno": "9988776655"
  }
  try{
  const user =new User(userObj);
  await user.save();
   res.send("User Added sucssfully")
  }catch{
    res.status(400).send("Error saving the user"+err.message);
  }
})



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