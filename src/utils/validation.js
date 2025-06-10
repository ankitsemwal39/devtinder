var validator = require('validator');

const validateSignUpData =(req) =>{
     const userData = req.body;
    const { firstName, lastName, emailID, password, age, gender, phoneno } = userData;
    //validate on data

   
    if (!firstName || !lastName) {
       throw new Error("Name is not valid!");
    }else if(!validator.isEmail(emailID)){
        throw new Error("Email is not valid!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("passowrd is not valid!");
    }
    
   /*
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

    */
}



module.exports ={
    validateSignUpData, 

};