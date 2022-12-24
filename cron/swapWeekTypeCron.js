const cron = require('node-cron')
const parseIsu1 = require('../lib/parseIsu1')

const swapWeekType = () => {
    cron.schedule('0 0 * * 1', () => {
        try {
            parseIsu1()
        }
        catch (err) {
            console.log(err)
        }
    }, {
        timezone: 'Europe/Kiev'
    })
    console.log(`Change week type has started`)
}

module.exports = swapWeekType
