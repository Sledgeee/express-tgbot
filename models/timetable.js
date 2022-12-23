const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
    number: Number,
    startHour: Number,
    startMinute: Number,
    endHour: Number,
    endMinute: Number,
    break: Number
})

const Timetable = mongoose.model('Timetable', timetableSchema)


const createPlainTimetable = async () => {
    const docs = await Timetable.find()
    let plain = ''
    if (docs.length > 0) {
        const ft = (number) => number < 10 ? `0${number}` : number
        docs.forEach(doc => {
            const lesson = `Пара №${doc.number}:`
            const start = `${ft(doc.startHour)}:${ft(doc.startMinute)}-${ft(doc.endHour)}:${ft(doc.endMinute)}`
            const breakStr = doc.break > 0 ? `(перерва ${doc.break})` : ''
            plain += `${lesson} ${start} ${breakStr}\n`
        })
        return plain
    }
    return 'Графік пар ще не додано'
}

module.exports = { Timetable, createPlainTimetable }
