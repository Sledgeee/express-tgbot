const { bot } = require("../lib/bot")
const { addBirthday } = require('../models/birthday')
const { createWeek } = require('../models/week')
const { addNewPlaylist } = require("../models/playlist")
const { addAdmin, checkRights } = require("../models/admin")

const call = async (func, username, superRights, ...args) => {
    const { isOwner, isAdmin } = await checkRights(username)
    return superRights
        ? isOwner
            ? (await func(...args)
                ? 'Виконано ✅' 
                : 'Операція відмінена або сталась помилка ❌')
            : 'У вас немає прав ❌'
        : isAdmin
            ? (await func(...args)
                ? 'Виконано ✅' 
                : 'Операція відмінена або сталась помилка ❌')
            : 'У вас немає прав ❌'
}

bot.onText(/\/addAdmin (.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await call(addAdmin, msg.from.username, true, match[1]))
})

bot.onText(/\/addBirthday (.+) (.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await call(addBirthday, msg.from.username, false, match[1], match[2]))
})

bot.onText(/\/addWeek (.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await call(createWeek, msg.from.username, false, match[1]))
})

bot.onText(/\/addPlaylist (.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await call(addNewPlaylist, msg.from.username, false, match[1]))
})
