const setupCron = () => {
    require("./checkBirthdayCron")()
    require("./swapWeekTypeCron")()
    require("./checkScheduleCron")()
    require("./notifyScheduleCron")()
}

module.exports = setupCron
