const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
    // trim: true
  },
  lastName: {
    type: String,
    // required: true,
    // trim: true
  },
  emailID: {
    type: String,
    // required: true,
    // unique: true,
    // lowercase: true,
    // trim: true,
    // match: [/\S+@\S+\.\S+/, 'Invalid email format']
  },
  password: {
    type: String,
    // required: true,
    // minlength: 6
  },
  age: {
    type: Number,
    // min: 13,
    // max: 120
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other'
  },
  phoneno: {
    type: String,
    // required: true,
    match: [/^[6-9]\d{9}$/, 'Invalid Indian phone number']
  }
}, { timestamps: true });

const userModel= mongoose.model('User', userSchema);

module.exports =userModel;