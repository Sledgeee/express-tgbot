const TimetableModel = require('../models/timetableModel')

class TimetableController {
    static async createPlainTimetable() {
        const docs = await TimetableModel.find({}, null, { sort: { number: 1 } })
        let plainText = ''
        if (docs.length > 0) {
            const ft = (number) => number < 10 ? `0${number}` : number
            docs.forEach(doc => {
                const lesson = `№${doc.number}:`
                const start = `${ft(doc.startHour)}:${ft(doc.startMinute)}-${ft(doc.endHour)}:${ft(doc.endMinute)}`
                const breakStr = doc.break > 0 ? `(перерва ${doc.break} хв)` : ''
                plainText += `${lesson} ${start} ${breakStr}\n`
            })
            return plainText
        }
        return 'Графік пар ще не додано ⚠️'
    } 
}

module.exports = TimetableController
