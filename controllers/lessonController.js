const LessonTypeModel = require('../models/lessonTypeModel')
const LessonModel = require('../models/lessonModel')
const TeacherController = require('./teacherController')

class LessonController {
    static async seedLessonTypes() {
        try {
            await LessonTypeModel.create([
                {
                    type: 'пр.'
                },
                {
                    type: 'лаб.'
                },
                {
                    type: 'лекц.'
                }
            ])
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async createLesson(name, type, teacher) {
        try {
            const lessontype = await LessonTypeModel.findOne({type: type})
            const tchr = await TeacherController.findOne({name: teacher})
            if (!lessontype || !tchr) return false
            await LessonModel.create({
                name: name,
                lessonType: lessontype.id,
                teacher: tchr.id
            })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

module.exports = LessonController
