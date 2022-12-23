const cron = require('node-cron')
const DateTime = require('../lib/datetime')

const checkSchedule = () => {
    cron.schedule('*/5 7-20 * * 1-6', async () => {
        try {
            const now = DateTime.now()

            switch(now.day()) {
                case 1:
                    break
                case 2:
                    break
                case 3:
                    break
                case 4:
                    break
                case 5:
                    break
                case 6:
                    break
            }
        }
        catch (err) {
            console.log(err)
        }
    })
    console.log(`Check schedule has started`)
}

module.exports = checkSchedule
