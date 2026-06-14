const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type:String,
    required: true,
  },
  email: String,
  age: {
  type: Number,
  required: true,
  min: 0,
  max: 150
  },
  phone: String,
  password: String,
  role: { type: String, enum: ["doctor", "patient"] }
});

const User = mongoose.model("User", userSchema);
module.exports = User;