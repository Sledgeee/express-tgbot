const cron = require('node-cron')
const DateTime = require('../lib/datetime')

const notifySchedule = () => {
    cron.schedule('0 8 * * 1-6', async () => {
        console.log('Cron: Notify schedule job working')
        try {
            
        } catch (err) {
            console.log(err)
        }
        console.log('Cron: Notify schedule job done')
    }, {
        timezone: 'Europe/Kiev'
    })
    console.log('Cron: Notify schedule job scheduled')
}

module.exports = notifySchedule
