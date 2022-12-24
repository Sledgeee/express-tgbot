// main bot
//const TG_TOKEN = '5594525862:AAEFxkXLczSGIoHO8Z1QaZQe60egOO5K5iA'
//const CHAT_ID = -1001241875961

// test bot
const TG_TOKEN = '5849311402:AAFSPPkjQu7Xc0Ltbxfi83d6-NgkOgM6SE4'
const CHAT_ID = -1001776732468

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(TG_TOKEN, { polling: true })

module.exports = { bot, CHAT_ID }
