const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema({
  studentName: String,
  date: String,
});

module.exports = mongoose.model("Birthday", birthdaySchema);
