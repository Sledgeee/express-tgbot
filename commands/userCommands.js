const { bot } = require("../lib/bot")
const startMarkup = require('../markups/startMarkup')
const BotController = require('../controllers/botController')

bot.on('message', async (msg) => {
    switch (msg.text) {
        case '/start':
            bot.sendMessage(msg.chat.id, 'Обери, що тобі потрібно:', startMarkup)
            break
        case '/start@ki_scheduleBot':
            bot.sendMessage(msg.chat.id, 'Обери, що тобі потрібно:', startMarkup)
            break
        case '/playlist':
            await BotController.sendPlaylist(msg.chat.id)
            break
        case '/playlist@ki_scheduleBot':
            await BotController.sendPlaylist(msg.chat.id)
            break
        case '/timetable':
            await BotController.sendTimetable(msg.chat.id)
            break
        case '/timetable@ki_scheduleBot':
            await BotController.sendTimetable(msg.chat.id)
            break
        case '/week':
            await BotController.sendWeek(msg.chat.id)
            break
        case '/week@ki_scheduleBot':
            await BotController.sendWeek(msg.chat.id)
            break
        case '/schedule':
            await BotController.sendFullSchedule(msg.chat.id)
            break
        case '/schedule@ki_scheduleBot':
            await BotController.sendFullSchedule(msg.chat.id)
            break
        case '/schedule_today':
            await BotController.sendTodaysSchedule(msg.chat.id)
            break
        case '/schedule_today@ki_scheduleBot':
            await BotController.sendTodaysSchedule(msg.chat.id)
            break
        case '/cock':
            await BotController.sendCock(msg.chat.id)
            break
        case '/cock@ki_scheduleBot':
            await BotController.sendCock(msg.chat.id)
            break
        case '/help':
            await BotController.sendUserHelp(msg.chat.id)
            break
        case '/help@ki_scheduleBot':
            await BotController.sendUserHelp(msg.chat.id)
            break
        case '/help admin':
            await BotController.sendAdminHelp(msg.chat.id)
            break
        case '/help@ki_scheduleBot admin':
            await BotController.sendAdminHelp(msg.chat.id)
            break  
    }
})

bot.onText(/\/playlist (.+)/, async (msg, match) => {
    await BotController.sendPlaylist(msg.chat.id, match[1])
})

bot.onText(/\/playlist@ki_scheduleBot (.+)/, async (msg, match) => {
    await BotController.sendPlaylist(msg.chat.id, match[1])
})
