const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  token: String,
  firstName: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;