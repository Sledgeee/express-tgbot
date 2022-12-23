const cron = require('node-cron')
const { Birthday } = require('../models/birthday')
const { bot, CHAT_ID } = require('../lib/bot')
const DateTime = require('../lib/datetime')

const checkBirthday = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const birthdays = await Birthday.find()
            const today = DateTime.nowFormatted().replace('-', '.')
            for (const birthday of birthdays) {
                if (birthday.date === today) {
                    await bot.sendMessage(CHAT_ID, `${birthday.studentName} сьогодні святкує день народження!`)
                    await bot.sendSticker(CHAT_ID, 'CAACAgIAAxkBAAEG9LhjpKhQ2FUi31gbecql2Kr89xrLBQAChQIAAkGa3Q37oxVj75ZDnywE')
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    })
    console.log(`Check birthday has started`)
}

module.exports = checkBirthday