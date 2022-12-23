const { bot } = require("../lib/bot")
const { sendTimetable, sendLatestPlaylist } = require("../services/sender")

bot.on('callback_query', async (callback) => {
    try {
        switch(callback.data) {
            case 'playlist':
                await sendLatestPlaylist(callback.message.chat.id, 0)
                break
            case 'schedule':
                bot.sendMessage(callback.message.chat.id, 'Ще не додано')
                break
            case 'timetable':
                await sendTimetable(callback.message.chat.id)
                break
        }
    } catch (err) {
        console.log(err)
    }
})
