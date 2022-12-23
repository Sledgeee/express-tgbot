const checkBirthday = require("./checkBirthday")
const swapWeekType = require("./swapWeekType")
const checkSchedule = require('./checkSchedule')

const setupCron = () => {
    swapWeekType()
    checkBirthday()
    checkSchedule()
}

module.exports = setupCron
