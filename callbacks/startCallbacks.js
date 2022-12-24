const { bot } = require("../lib/bot")
const BotController = require('../controllers/botController')

bot.on('callback_query', async (callback) => {
    try {
        switch(callback.data) {
            case 'playlist':
                await BotController.sendPlaylist(msg.chat.id, 'latest')
                break
            case 'schedule':
                await BotController.sendFullSchedule(await bot.sendMessage(msg.chat.id, 'Генерація...'))
                break
            case 'timetable':
                await BotController.sendTimetable(await bot.sendMessage(msg.chat.id, 'Генерація...'))
                break
        }
    } catch (err) {
        console.log(err)
    }
})
