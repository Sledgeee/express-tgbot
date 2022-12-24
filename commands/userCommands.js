const { bot } = require("../lib/bot")
const startMarkup = require('../markups/startMarkup')
const BotController = require('../controllers/botController')

const { BOT_TAG } = process.env
const commands = {
    start: { 
        command: '/start' + BOT_TAG,
        help: '/start - Розпочати діалог з ботом\n'
    },
    playlist: {
        command: '/playlist' + BOT_TAG,
        help: '/playlist - Отримати плейліст за поточний семестр\n'
    },
    playlists: {
        command: '/playlists' + BOT_TAG,
        help: '/playlists - Отримати всі доступні плейлісти\n'
    },
    timetable: {
        command: '/timetable' + BOT_TAG,
        help: '/timetable - Отримати графік початку та кінця пар\n'
    },
    week: {
        command: '/week' + BOT_TAG,
        help: '/week - Який зараз тиждень?\n'
    },
    schedule: {
        command: '/schedule' + BOT_TAG,
        help: '/schedule - Отримати розклад пар на тиждень\n'
    },
    scheduleToday: {
        command: '/schedule_today' + BOT_TAG,
        help: '/schedule_today - Отримати розклад пар на сьогоднішній день\n'
    },
    cock: {
        command: '/cock' + BOT_TAG,
        help: '/cock - 🐓\n'
    }
}

bot.on('message', async (msg) => {
    const message = msg.text.includes('@ki_scheduleBot') ? msg.text : msg.text + '@ki_scheduleBot'
    switch (message) {
        case commands.start.command:
            await bot.sendMessage(msg.chat.id, 'Обери, що тобі потрібно:', startMarkup)
            break
        case commands.playlist.command:
            await BotController.sendPlaylist(msg.chat.id, 'latest')
            break
        case commands.playlists.command:
            await BotController.sendPlaylist(msg.chat.id, 'all')
            break
        case commands.timetable.command:
            await BotController.sendTimetable(await bot.sendMessage(msg.chat.id, 'Генерація...'))
            break
        case commands.week.command:
            await BotController.sendWeek(msg.chat.id)
            break
        case commands.schedule.command:
            await BotController.sendFullSchedule(await bot.sendMessage(msg.chat.id, 'Генерація...'))
            break
        case commands.scheduleToday.command:
            await BotController.sendTodaysSchedule(await bot.sendMessage(msg.chat.id, 'Генерація...'))
            break
        case commands.cock.command:
            await BotController.sendCock(msg.chat.id)
            break
        case '/help' + BOT_TAG:
            await BotController.sendUserHelp(msg.chat.id, commands)
            break
    }
})
