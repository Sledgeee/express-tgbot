const cron = require('node-cron')
const { Week } = require('../models/week')

const swapWeekType = () => {
    cron.schedule('0 0 * * 1', async () => {
        try {
            const week = await (await Week.find()).pop()
            await Week.create({
                type: week.type = "Знаменник" ? "Чисельник" : "Знаменник"
            })
            await Week.deleteOne(week)
        }
        catch (err) {
            console.log(err)
        }
    })
    console.log(`Change week type has started`)
}

module.exports = swapWeekType
