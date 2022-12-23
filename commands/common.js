const { bot } = require("../lib/bot")
const startMarkup = require('../markups/start')
const { sendLatestPlaylist, sendTimetable } = require("../services/sender")


bot.on('message', async (msg) => {
    switch (msg.text) {
        case '/start':
            bot.sendMessage(msg.chat.id, 'Обери, що тобі потрібно:', startMarkup)
            break
        case '/start@ki_scheduleBot':
            bot.sendMessage(msg.chat.id, 'Обери, що тобі потрібно:', startMarkup)
            break
        case '/playlist':
            await sendLatestPlaylist(msg.chat.id, 0)
            break
        case '/playlist@ki_scheduleBot':
            await sendLatestPlaylist(msg.chat.id, 0)
            break
        case '/timetable':
            await sendTimetable(msg.chat.id)
            break
        case '/timetable@ki_scheduleBot':
            await sendTimetable(msg.chat.id)
            break
    }
})

bot.onText(/\/playlist (.+)/, async (msg, match) => {
    await sendLatestPlaylist(msg.chat.id, match[1])
})

bot.onText(/\/playlist@ki_scheduleBot (.+)/, async (msg, match) => {
    await sendLatestPlaylist(msg.chat.id, match[1])
})
