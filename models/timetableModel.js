const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  number: Number,
  startHour: Number,
  startMinute: Number,
  endHour: Number,
  endMinute: Number,
  break: Number,
});

module.exports = mongoose.model("Timetable", timetableSchema);
