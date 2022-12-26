const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  day: String,
  dayNumber: Number,
  number: Number,
  week: String,
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
});

const weeks = ["Чисельник", "Знаменник", "-"];
const ScheduleModel = mongoose.model("Schedule", scheduleSchema);

module.exports = { ScheduleModel, weeks };
