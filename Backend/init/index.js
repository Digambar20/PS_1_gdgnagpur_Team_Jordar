const mongoose = require("mongoose");
const initData = require("./data.js");
const User = require("../models/user.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/patient-tracker");
  console.log("Connected to DB");
}

const initDB = async () => {
  await User.deleteMany({});
  await User.insertMany(initData.data);
  console.log("Data was initialized");
};

main()
  .then(initDB)
  .then(() => {
    mongoose.connection.close();   // 🔥 THIS IS THE FIX
    console.log("DB connection closed");
  })
  .catch(err => console.log(err));