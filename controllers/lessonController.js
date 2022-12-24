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

    static async createLesson(name, shortName, typesStr, teachersStr) {
        try {
            const types = typesStr.split(', ')
            const teachers = teachersStr.split(', ')
            const lessons = []
            for (let i = 0; i < types.length; i++) {
                const lessonType = await LessonTypeModel.findOne({type: types[i]})
                const teacher = await TeacherController.findOne(teachers[i])   
                if (!teacher || !lessonType) return false
                lessons.push({
                        name: name,
                        shortName: shortName,
                        lessonType: lessonType.id,
                        teacher: teacher.id
                    })
            }
            await LessonModel.create(lessons)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

module.exports = LessonController
