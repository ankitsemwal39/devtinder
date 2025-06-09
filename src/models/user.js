const mongoose = require('mongoose');

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
    // trim: true,
    // match: [/\S+@\S+\.\S+/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    unique:true,
    minlength: 6
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
  },
}, { timestamps: true });

const userModel= mongoose.model('User', userSchema);

module.exports =userModel;