const { bot } = require('../lib/bot')
const PlaylistController = require('../controllers/playlistController')
const TimetableController = require('../controllers/timetableController')
const WeekController = require('../controllers/weekController')
const ScheduleController = require('../controllers/scheduleController')

class BotController {
    static async sendPlaylist(chatId, mode) {
        bot.sendMessage(chatId, await PlaylistController.getPlaylist(mode))
    }
    
    static async sendTimetable(chatId) {
        bot.sendMessage(chatId, await TimetableController.createPlainTimetable())
    }
    
    static async sendWeek(chatId) {
        bot.sendMessage(chatId, await WeekController.getWeek())
    }
    
    static async sendFullSchedule(chatId) {
        bot.sendMessage(chatId, await ScheduleController.generateFullPlainSchedule())
    }
    
    static async sendTodaysSchedule(chatId) {
        bot.sendMessage(chatId, await ScheduleController.generateTodaysPlainSchedule())
    }

    static async sendCock(chatId) {
        const cockSize = Math.floor(Math.random() * 50) + 1
        const reactionOnSize = 
            cockSize == 50 ? '🫡' :
                cockSize >= 35 ? '🤩' :
                    cockSize >= 10 ? '😎' :'🧐'
        await bot.sendMessage(chatId, `Твій 🐓 ${cockSize} см ${reactionOnSize}`)
    }

    static async sendUserHelp(chatId) {
        await bot.sendMessage(chatId, 
            'Перелік команд юзера:\n' +
            'УВАГА! Параметри команди пишуться в один рядок з командою. Приклад: /playlist all'
        )
    }

    static async sendAdminHelp(chatId) {
        await bot.sendMessage(chatId,
            'Перелік команд адміністратора:\n' +
            '/addAdmin - Додати адміна. Параметри: [Телеграм юзернейм]\n' +
            '/addBirthday - Додати студента до списку ДР. Параметри: [Прізвище Ім\'я] [Дата (Приклад: 18.08)]\n' +
            '/addPlaylist - Додати плейліст. Параметри: [Посилання]\n' +
            '/updateWeek - Синхронізація тижня з isu1 (Чисельник/Знаменник)\n' +
            '/addLesson - Додати пар. Параметри: [Назва] [Тип (пр., лаб., лекц.)] [Викладач (Приклад: Лисенко С.М.)]\n' +
            '/seedLessonTypes - Сід типів пар\n' +
            '/addTeacher - Додати викладача. Параметри: [ПІБ (Приклад: Лисенко С.М.)]\n\n' + 
            'УВАГА! Параметри команди пишуться в один рядок з командою. Приклад: /addTeacher Лисенко С.М.'
        )
    }
}

module.exports = BotController
