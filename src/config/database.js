const mongoose = require('mongoose');

const dbName = "DevTinder";
const url = `mongodb://localhost:27017/${dbName}`;

const connectDB = async () => {
    
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
   };

module.exports =connectDB;

