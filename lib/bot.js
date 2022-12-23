// main bot
//const TG_TOKEN = '5594525862:AAEFxkXLczSGIoHO8Z1QaZQe60egOO5K5iA'
//const CHAT_ID = -1001241875961

// test bot
const TG_TOKEN = '5460324446:AAErTBcaOLyp5-dx8l6Ev811pNtypdz2cho'
const CHAT_ID = -1001776732468

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(TG_TOKEN, { polling: true })

module.exports = { bot, CHAT_ID }
