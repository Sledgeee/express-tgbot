const { bot } = require('../lib/bot')
const agreeMarkup = require('../markups/agree')
const { getLatestPlaylist } = require('../models/playlist')
const { createPlainTimetable } = require('../models/timetable')

const sendLatestPlaylist = async (chatId, number) => {
    const result = await getLatestPlaylist(number)
    if (result.status != null && result.status === true) {
        await bot.sendMessage(chatId, result.msg)
    } else {
        await bot.sendMessage(chatId, result.msg, agreeMarkup('playlist'))
    }
}

const sendTimetable = async (chatId) => {
    bot.sendMessage(chatId, await createPlainTimetable())
}

module.exports = { sendLatestPlaylist, sendTimetable }
