const mongoose = require("mongoose");

const weekSchema = new mongoose.Schema({
  type: String,
});

module.exports = mongoose.model("Week", weekSchema);
