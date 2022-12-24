const cheerio = require('cheerio')
const needle = require('needle')
const tress = require('tress')
const { bot } = require('./bot')
const WeekController = require('../controllers/weekController')

const URL = 'http://isu1.khnu.km.ua/isu/'

const parseIsu1 = (chatId = 0, needLogs = false) => {
    needLogs && bot.sendMessage(chatId, 'З\'єднуюсь з електронним університетом...')
    const q = tress((url, callback) => {
        needle.get(URL, async (err, res) => {
            if (err) {
                needLogs && await bot.sendMessage(chatId, 'Під час з\'єднання з електронним університетом сталась помилка ❌')
                return
            }
            needLogs && await bot.sendMessage(chatId, 'Зв\'язок встановлено ✅\nЗавантаження вмісту...')
            try {
                const $ = cheerio.load(res.body)
                const text = $('#S1').contents().eq(0).text().trim()
                if (text != '') {
                    needLogs && await bot.sendMessage(chatId, 'Вміст завантажено ✅\nОбробка отриманого вмісту...')
                    await WeekController.updateWeek(text)
                    needLogs && await bot.sendMessage(chatId, 'Вміст оброблено ✅\nОновлення бази даних...')
                    needLogs && await bot.sendMessage(chatId, 'Оновлення завершене ✅')
                    return
                }
            } catch (err) {
                console.log(err)
                needLogs && await bot.sendMessage(chatId, 'Щось пішло не так під час обробки вмісту ❌')
            }
        })
    }, 1)
    q.push(URL)
}

module.exports = parseIsu1
