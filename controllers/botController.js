const { bot } = require('../lib/bot')
const PlaylistController = require('../controllers/playlistController')
const TimetableController = require('../controllers/timetableController')
const WeekController = require('../controllers/weekController')
const ScheduleController = require('../controllers/scheduleController')

class BotController {
    static async sendPlaylist(chatId, mode) {
        bot.sendMessage(chatId, await PlaylistController.getPlaylist(mode))
    }
    
    static async sendTimetable(message) {
        bot.editMessageText(await TimetableController.createPlainTimetable(), {
            chat_id: message.chat.id,
            message_id: message.message_id
        })
    }
    
    static async sendWeek(chatId) {
        bot.sendMessage(chatId, await WeekController.getWeek())
    }
    
    static async sendFullSchedule(message) {
        bot.editMessageText(await ScheduleController.generateFullPlainSchedule(), {
            chat_id: message.chat.id,
            message_id: message.message_id
        })
    }
    
    static async sendTodaysSchedule(message) {
        bot.editMessageText(await ScheduleController.generateTodaysPlainSchedule(), {
            chat_id: message.chat.id,
            message_id: message.message_id
        })
    }

    static async sendCock(chatId) {
        const cockSize = Math.floor(Math.random() * 50) + 1
        const reactionOnSize = 
            cockSize == 50 ? '🫡' :
                cockSize >= 35 ? '🤩' :
                    cockSize >= 10 ? '😎' :'🧐'
        await bot.sendMessage(chatId, `Твій 🐓 ${cockSize} см ${reactionOnSize}`)
    }

    static async sendUserHelp(chatId, commands) {
        let help = ''
        Object.values(commands).forEach(value => {
            help += value.help
        })
        await bot.sendMessage(chatId, 'Перелік команд юзера:\n' + help)
    }

    static async sendAdminHelp(chatId, commands) {
        let help = ''
        commands.forEach(command => {
            help += command
        })
        await bot.sendMessage(chatId,
            'Перелік команд адміністратора:\n' + 
            help + '\n<b>УВАГА! Параметри команди пишуться з ; в початку. Приклад: /command ;parameter</b>',
            {
                parse_mode: 'HTML'
            }
        )
    }
}

module.exports = BotController
