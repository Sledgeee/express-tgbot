const cron = require('node-cron')
const DateTime = require('../lib/datetime')

const notifySchedule = () => {
    cron.schedule('0 8 * * 1-6', async () => {
        try {
            
        } catch (err) {
            console.log(err)
        }
    }, {
        timezone: 'Europe/Kiev'
    })
    console.log('Notify schedule has started')
}

module.exports = notifySchedule
