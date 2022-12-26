const mongoose = require("mongoose");

const zoomSchema = new mongoose.Schema({
  link: String,
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
});

module.exports = mongoose.model("Zoom", zoomSchema);
