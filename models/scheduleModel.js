const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    day: Number,
    number: Number,
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"
    }
})

module.exports = mongoose.model('Schedule', scheduleSchema)
