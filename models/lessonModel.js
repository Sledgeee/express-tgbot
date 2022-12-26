const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  name: String,
  shortName: String,
  type: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  zoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zoom",
  },
});

const LessonModel = mongoose.model("Lesson", lessonSchema);
const types = ["пр.", "лаб.", "лекц."];

module.exports = { LessonModel, types };
