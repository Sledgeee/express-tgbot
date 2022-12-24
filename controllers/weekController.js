const WeekModel = require('../models/weekModel')

class WeekController {
    static async updateWeek(type) {
        try {
            const docs = await WeekModel.find()
            if (docs.length > 0) {
                const week = docs.pop()
                week.type = type
                await WeekModel.updateOne(week)
            } else {
                await WeekModel.create({
                    type: type
                })
            }
            return true
        } catch (err) {
            return false
        }
    }

    static async getWeek() {
        return (await WeekModel.find()).pop().type
    }
}

module.exports = WeekController
