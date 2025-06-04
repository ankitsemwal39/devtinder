// console.log("Starting a new project.");

const express =require('express');

const app = express();

/*// Route 1: Root path "/"
app.use("/", (req, res) => {
  res.send("👋 Hello from the root route!");
});

// Route 2: "/test"
app.use("/test", (req, res) => {
  res.send("🧪 Welcome to the test endpoint!");
});

// Route 3: "/pop"
app.use("/pop", (req, res) => {
  res.send("🎉 You reached the pop route!");
});*/

app.get("/", (req, res) => {
    res.send("👋 Hello from the root route!");
});

app.get("/test", (req, res) => {
    res.send("🧪 Welcome to the test endpoint!");
});

app.get("/pup", (req, res) => {
   console.log(req.query);
    res.send("🎉 You reached the pop route!");
});

//??
// app.get("/ab?c", (req, res) => {
//     res.send({ "nam": "wewe", "phone": "232323" });
// });

app.post("/testPost", (req, res) => {
    res.send("🎉 saving data in post");
});


app.delete("/testDelete", (req, res) => {
    res.send("🎉 data of user deleting");
});

//Middleware
// custom middleware create
const LoggerMiddleware = (req,res,next) =>{
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    next();
}

// const app = express()

// application level middleware
app.use(LoggerMiddleware);


// users route
app.get('/users',(req,res)=>{
    res.json({
        'status':true
    })
})



app.listen(3000,() =>{
    console.log("server is automatically listening on port 3000 ");
});