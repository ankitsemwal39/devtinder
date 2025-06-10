const express =require('express');

const app = express();

//DB call
const connectDB =require("./config/database")
const User =require("./models/user")

// Middleware to parse JSON request bodies
app.use(express.json());


/*
app.post("/signup",async(req,res)=>{
  const userData = req.body;
 console.log("userData",userData);
//         const userObj= {
//     "firstName": "Rahul",
//     "lastName": "Yadav",
//     "emailID": "rahul.yadav@example.com",
//     "password": "rahul@123",
//     "age": 31,
//     "gender": "Male",
//     "phoneno": "9988776655"
//   }
    try{
    const { firstName, lastName, emailID, password, age, gender, phoneNo } = userData;

    // Example: process each field
    if (!firstName) {
        return res.status(400).json({ error: "First name is required" });
    }
    
    if (!emailID || !emailID.includes('@')) {
        return res.status(400).json({ error: "Valid emailID is required" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    if (!age || age <= 18) {
        return res.status(400).json({ error: "Age must be at least 18 years old" });
    }
    
 
    console.log("working 1");
   const user =new User(userData);
   console.log("working user"+user);
   await user.save();
   res.send("User Added sucssfully")
  }catch{
    res.status(400).send("Error saving the user" );
  }
})
*/

app.post("/signup", async (req, res) => {
    const userData = req.body;
    console.log("userData", userData);

    const { firstName, lastName, emailID, password, age, gender, phoneNo } = userData;
    //validate on data
    if (!firstName) {
        return res.status(400).json({ error: "First name is required" });
    }

    if (!emailID || !emailID.includes('@')) {
        return res.status(400).json({ error: "Valid emailID is required" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    if (!age || age <= 18) {
        return res.status(400).json({ error: "Age must be at least 18 years old" });
    }
    //Encrypt the password

    try {
        console.log("working 1");
        const user = new User(userData);
        console.log("working user", user);
        await user.save();
        res.status(201).json({ message: "User added successfully", user });
    } catch (err) {
        console.error("Error saving the user:", err);
        res.status(400).send("Error saving the user");
    }
});



// Feed API GET/feed - get all the users
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find(); // fetch all users
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/getUsers', async (req, res) => {
    const userEmail = req.body.emailID;
    try {
        const user = await User.find({emailID: userEmail}); // fetch all users
        if(user.length==0){
            res.status(404).send("User data not found")
        }else{
            res.send(user);
        }        
        
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// findByIdAndDelete ==delete
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        // const users = await User.findByIdAndDelete({_id:userId});
        const users = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    } catch (err) {
        res.status(400).json({ error: 'Something went wrong' });
    }
});


// Feed API GET/feed - update data
app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data =req.body;
    
  

    try {
          //toIgnore or toAllowed Data
    const ALLOWED_UPDATES =["userId","skills",
        "photoUrl","about","gender","age","emailID"]

//     {
//    "userId":"6842928f18ea52d8bae47961",
// "firstName":"Rahul222",
// "skills":["js","cs"],
//  "gender": "test"
// }
    const isUpdateAllowed =Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k))

    if(!isUpdateAllowed){
        // res.status(400).send("Update not allowed")
        throw new Error("Update not allowed");
    }
    if(data?.skills.length >4){
        throw new Error ("Skills cannot be more then 4")
    }


        // const users = await User.findByIdAndDelete({_id:userId});
        const users = await User.findByIdAndUpdate(
            {_id:userId},data,{returnDocument:'before',runValidators:true,});
        console.log(users);
            res.send("user data successfully updated");
    } catch (err) {
        res.status(400).send('Something went wrong '+ err.message );
    }
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