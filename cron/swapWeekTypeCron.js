const cron = require('node-cron')
const parseIsu1 = require('../lib/parseIsu1')

const swapWeekType = () => {
    cron.schedule('0 0 * * 1', () => {
        console.log('Cron: Swap week type job working')
        try {
            parseIsu1()
        }
        catch (err) {
            console.log(err)
        }
        console.log('Cron: Swap week type job done')
    }, {
        timezone: 'Europe/Kiev'
    })
    console.log('Cron: Swap week type job scheduled')
}

module.exports = swapWeekType
