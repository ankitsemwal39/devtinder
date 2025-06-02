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

app.get("/pop", (req, res) => {
    res.send("🎉 You reached the pop route!");
});


app.listen(3000,() =>{
    console.log("server is automatically listening on port 3000");
});