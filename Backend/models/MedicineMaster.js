const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineMasterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MedicineMaster = mongoose.model("MedicineMaster", medicineMasterSchema);
module.exports = MedicineMaster;
