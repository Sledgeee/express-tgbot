const cron = require('node-cron')
const BirthdayModel = require('../models/birthdayModel')
const { bot, CHAT_ID } = require('../lib/bot')
const DateTime = require('../lib/datetime')

const checkBirthday = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const birthdays = await BirthdayModel.find()
            const today = DateTime.nowFormatted().replace('-', '.')
            for (const birthday of birthdays) {
                if (birthday.date === today) {
                    await bot.sendMessage(CHAT_ID, `${birthday.studentName} сьогодні святкує День Народження!`)
                    await bot.sendSticker(CHAT_ID, 'CAACAgIAAxkBAAEG9LhjpKhQ2FUi31gbecql2Kr89xrLBQAChQIAAkGa3Q37oxVj75ZDnywE')
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }, {
        timezone: 'Europe/Kiev'
    })
    console.log(`Check birthday has started`)
}

module.exports = checkBirthday
