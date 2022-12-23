const mongoose = require('mongoose')

const lessonTypeSchema = new mongoose.Schema({
    type: String,
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher"
    }
})

const LessonType = mongoose.model('LessonType', lessonTypeSchema)

const lessonSchema = new mongoose.Schema({
    name: String,
    lessonType: {
        type: mongoose.Types.ObjectId,
        ref: "LessonType"
    },
    isSkipped: Boolean
})

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = { LessonType, Lesson }
