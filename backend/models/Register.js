const mongoose = require('mongoose');

const Users = mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
  mobileNumber: String,
  gender: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  imageUrl: String
});

module.exports.users = mongoose.model('users', Users);
