const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    minlength: 6,
    maxLength: 30,
    required: true
  },
  birthDay:{
    type: String
  },
  sex:{
    type: String,
    enum: ['Nam', 'Nữ', 'Khác']
  },
  phone: {
    type: Number,
    minlength: 10,
    unique: true,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxLength: 40,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
  },
  role: {
    type: String,
   enum: ['Admin', 'Customer', 'Staff']
  },
  status:{
    type: String,
    enum: ["banned", "active"],
    default: "active"
  },
  accountBalance: {
    type: Number,
    default: "0"
  },
  otp: {
    type: String,
    default: ''
  },
  otpExpires: {
    type: Date,
  },
  otpVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", UserSchema);