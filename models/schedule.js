const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    day: String,
    lessons: [{
        type: mongoose.Types.ObjectId,
        ref: "Lesson"
    }],
    isWeekend: Boolean
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = {Schedule}
