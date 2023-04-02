const mongoose = require("mongoose");

const countySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "County name is required"],
  },
  code: {
    type: String,
    required: [true, "Conty code is required"],
    unique: [true, "County with that code already exists"],
  },
  flagUrl: {
    type: String,
    required: [true, "County flag is required"],
  },
});

module.exports = mongoose.model("counties", countySchema);
