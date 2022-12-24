const ScheduleModel = require('../models/scheduleModel')

class ScheduleController {
    static async generateFullPlainSchedule() {
        try {
            const docs = await ScheduleModel.find().populate('lessons')
            if (docs.length > 0) {
                let plainText = ''
                docs.sort(x => x.day).forEach(doc => {
                    plainText += `${doc}`
                })
            }
        } catch (err) {
            console.log(err)
            return ''
        }
    }
    
    static async generateTodaysPlainSchedule(day) {
        try {
            const docs = await Schedule.find()
            if (docs.length > 0) {
                const schedule = docs.filter(x => x.day == day)
                if (schedule.length > 0) {
                    const today = schedule.pop()
                    if (!today.isWeekend) {
                        let plainText = ''
                        today.lessons.forEach((lesson, i) => {
                            console.log(lesson)
                        })
                    }
                }
                return 'Сьогодні немає пар 🤩'
            }
            return 'Розклад пар ще не додано ⚠️'
        } catch (err) {
            console.log(err)
            return 'Під час генерації розкладу щось пішло не так ❌'
        }
    }
    
    static async updateDaySchedule() {
    
    }
}

module.exports = ScheduleController
