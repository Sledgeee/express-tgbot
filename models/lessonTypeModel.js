const mongoose = require('mongoose')

const lessonTypeSchema = new mongoose.Schema({
    type: String,
})

module.exports = mongoose.model('LessonType', lessonTypeSchema)
