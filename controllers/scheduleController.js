const ScheduleModel = require('../models/scheduleModel')
const LessonController = require('./lessonController')
const days = require('../data/days')
const LessonTypeModel = require('../models/lessonTypeModel')
const TeacherController = require('./teacherController')
const DateTime = require('../lib/datetime')

class ScheduleController {
    static async addLessonToSchedule(day, number, lesson, lessonType) {
        try {
            const ltype = await LessonTypeModel.findOne({ type: lessonType })
            const lsson = await LessonController.findOne({ 
                shortName: lesson, 
                lessonType: ltype.id
            })
            if (!lsson || !ltype) return false
            await ScheduleModel.create({
                day: day,
                dayNumber: days[day],
                number: number,
                lesson: lsson.id
            })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async generateFullPlainSchedule() {
        try {
            const docs = await ScheduleModel.find({}, null, { sort: { dayNumber: 1, number: 1 } }).populate('lesson')
            if (docs.length > 0) {
                let day = docs[0].day
                let plainText = day + ':\n'
                for (const doc of docs) {
                    const lessonType = await LessonController.findById(doc.lesson.lessonType)
                    const teacher = await TeacherController.findById(doc.lesson.teacher)
                    if (day != doc.day) {
                        day = doc.day + ':\n'
                        plainText += day
                    }
                    plainText += `№${doc.number}: ${lessonType.type} ${doc.lesson.name}, ${teacher.name}\n`
                }
                return plainText
            }
            return 'Розклад пар ще не додано ⚠️'
        } catch (err) {
            console.log(err)
            return 'Під час генерації розкладу щось пішло не так ❌'
        }
    }
    
    static async generateTodaysPlainSchedule() {
        try {
            const docs = await ScheduleModel.find({}, null, { sort: { dayNumber: 1, number: 1 } }).populate('lesson')
            if (docs.length > 0) {
                const scheduleDocs = docs.filter(x => x.dayNumber == DateTime.now().day())
                if (scheduleDocs.length > 0) {
                    let plainText = ''
                    for (const doc of scheduleDocs) {
                        const lessonType = await LessonController.findById(doc.lesson.lessonType)
                        const teacher = await TeacherController.findById(doc.lesson.teacher)
                        plainText += `№${doc.number}: ${lessonType.type} ${doc.lesson.name}, ${teacher.name}\n`
                    }
                    return plainText
                }
                return 'Сьогодні немає пар 🤩'
            }
            return 'Розклад пар ще не додано ⚠️'
        } catch (err) {
            console.log(err)
            return 'Під час генерації розкладу щось пішло не так ❌'
        }
    }
}

module.exports = ScheduleController
