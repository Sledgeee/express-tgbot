const { bot } = require("../lib/bot")
const BotController = require('../controllers/botController')

bot.on('callback_query', async (callback) => {
    try {
        switch(callback.data) {
            case 'yes_playlist':
                await BotController.sendLatestPlaylist(callback.message.chat.id, -1)
                break
            case 'no_playlist':
                bot.sendMessage(callback.message.chat.id, 'Операцію відмінено ❌')
                break
        }
        bot.editMessageReplyMarkup(null, {
            chat_id: callback.message.chat.id, 
            message_id: callback.message.message_id
        })
    } catch (err) {
        console.log(err)
    }
})
