const cron = require('node-cron')
const DateTime = require('../lib/datetime')
const days = require('../data/days')

const checkSchedule = () => {
    cron.schedule('*/5 7-20 * * 1-6', async () => {
        console.log('Cron: Check schedule job working')
        try {
            const now = DateTime.now()
            switch(now.day()) {
                case days.MONDAY.number:
                    break
                case days.TUESDAY.number:
                    break
                case days.WEDNESDAY.number:
                    break
                case days.THIRSDAY.number:
                    break
                case days.FRIDAY.number:
                    break
                case days.SATURDAY.number:
                    break
            }
        }
        catch (err) {
            console.log(err)
        }
        console.log('Cron: Check schedule job done')
    }, {
        timezone: 'Europe/Kiev'
    })
    console.log(`Cron: Check schedule job scheduled`)
}

module.exports = checkSchedule
