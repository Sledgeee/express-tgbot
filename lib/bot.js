require('dotenv').config()

const { TG_TOKEN_TEST: TG_TOKEN, CHAT_ID_TEST: CHAT_ID } = process.env

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(TG_TOKEN, { polling: true })

module.exports = { bot, CHAT_ID }
