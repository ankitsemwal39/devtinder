const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    // trim: true
  },
  lastName: {
    type: String,
    required: true,
    // trim: true
  },
  emailID: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // match: [/\S+@\S+\.\S+/, 'Invalid email format']    
    validate(value){
        if(!validator.isEmail(value)){
        throw new Error(" Invalid email address: ");
        }
    },
  },
  password: {
    type: String,
    required: true,
    unique:true,
    minlength: 10,
    // validate(value){
    //     if(!validator.isStrongPassword(value)){
    //     throw new Error("Enter a Strong Pasword: ");
    //     }
    // },
  },
  age: {
    type: Number,
    min: 18,
    max: 120
  },
  gender: {
    type: String,
    //simple
    // enum: ['Male', 'Female', 'Other'],
    // default: 'Other'
    validate(value){
        if(!['Male', 'Female', 'Other'].includes(value)){
        throw new Error("Gender data is not found");
        }
    }
  },
  phoneno: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, 'Invalid Indian phone number']
  },
  photoUrl:{
    type:String,
    default:"https://as2.ftcdn.net/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
  },
  about:{
    type:String,
    default:"This is a default about of the user"
  },
  skills:{
    type:[String],

    validate(value){
        if(value.length ==5){
        throw new Error(`You must enter exactly 4 skills, but got ${value.length}`);
        }
    }
    
  },
}, { timestamps: true });


//jwd token into my schema method //best practics which attach to based on user so evry one have there own token
//dont use arrow function here
userSchema.methods.getJWT = async function () {
  const user = this;
  
  //Create a JWT Token
  const token = await jwt.sign({id:user._id}, "DEV@Tinder$790",{expiresIn:"1h"})
  console.log("token : ",token);
  return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){

  const user = this;

  const passwordHash =user.password;
  const  isPasswordValid =  bcrypt.compare(passwordInputByUser, 
    passwordHash);
     
    return isPasswordValid;
             
}

const userModel= mongoose.model('User', userSchema);

module.exports =userModel;