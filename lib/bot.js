const { TG_TOKEN, CHAT_ID } = process.env;

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(TG_TOKEN, { polling: true });

module.exports = { bot, CHAT_ID };
