const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    name: String,
    lessonType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LessonType"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
})

module.exports = mongoose.model('Lesson', lessonSchema)
