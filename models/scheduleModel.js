const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    day: Number,
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"
    }],
    isWeekend: Boolean
})

module.exports = mongoose.model('Schedule', scheduleSchema)
