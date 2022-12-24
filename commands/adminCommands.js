const { bot } = require("../lib/bot")
const AdminController = require('../controllers/adminController')
const BirthdayController = require('../controllers/birthdayController')
const PlaylistController = require('../controllers/playlistController')
const LessonController = require('../controllers/lessonController')
const parseIsu1 = require("../lib/parseIsu1")
const TeacherController = require("../controllers/teacherController")
const ScheduleController = require("../controllers/scheduleController")
const BotController = require('../controllers/botController')

const responseMessages = {
    success: 'Виконано ✅',
    error: 'Операція відмінена або сталась помилка ❌',
    noRights: 'У вас немає прав ❌\nДля отримання доступу до цієї команди зверніться до @'
}

const commands = []

const callAsync = async (func, username, superRights = false, ...args) => {
    const ownerInfo = await AdminController.getOwner()
    const { isOwner, isAdmin } = await AdminController.checkRights(username)
    return superRights
            ? isOwner
                ? (await func(...args)
                    ? responseMessages.success
                    : responseMessages.error)
                : responseMessages.noRights + ownerInfo.username
            : isAdmin
                ? (await func(...args)
                    ? responseMessages.success
                    : responseMessages.error)
                : responseMessages.noRights + ownerInfo.username
}

commands.push('/addAdmin - Додати адміна. Параметри: ;[Телеграм юзернейм]\n')
bot.onText(/\/addAdmin ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(AdminController.addAdmin, 
        msg.from.username, true, match[1]))
})

commands.push('/addTeacher - Додати викладача. Параметри: ;[ПІБ (Приклад: Лисенко С.М.)]\n')
bot.onText(/\/addTeacher ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(TeacherController.createTeacher, 
        msg.from.username, false, match[1]))
})

commands.push('/addBirthday - Додати студента до списку ДР. Параметри: ;[Прізвище Ім\'я] ;[Дата (Приклад: 18.08)]\n')
bot.onText(/\/addBirthday ;(.+) ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(BirthdayController.addBirthday, 
        msg.from.username, false, match[1], match[2]))
})

commands.push('/addPlaylist - Додати плейліст. Параметри: ;[Посилання]\n')
bot.onText(/\/addPlaylist ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(PlaylistController.addNewPlaylist, 
        msg.from.username, false, match[1]))
})

commands.push('/updateWeek - Синхронізація тижня з isu1 (Чисельник/Знаменник)\n')
bot.onText(/\/updateWeek/, (msg) => {
    parseIsu1(msg.chat.id, true)
})

commands.push('/seedLessonTypes - Сід типів пар\n')
bot.onText(/\/seedLessonTypes/, async (msg) => {
    bot.sendMessage(msg.chat.id, await callAsync(LessonController.seedLessonTypes, 
        msg.from.username))
})

commands.push('/addLesson - Додати пар. Параметри: ;[Назва] [Абревіатура] ;[Типи (Приклад: пр., лаб., лекц.)] ;[Викладач (Приклад: Лисенко С.М.)]\n')
bot.onText(/\/addLesson ;(.+) ;(.+) ;(.+) ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(LessonController.createLesson, 
        msg.from.username, false, match[1], match[2], match[3], match[4]))
})

commands.push('/getLessons - Отримати всі пари з бази даних\n')
bot.onText(/\/getLessons/, async (msg) => {
    bot.sendMessage(msg.chat.id, await LessonController.getAllLessons())
})

commands.push('/appendSchedule - Додати пару до розкладу. Параметри: ;[День (Приклад: Понеділок)] ;[Номер пари] ;[Коротка назва пари (Приклад: ПВС)]\n')
bot.onText(/\/appendSchedule ;(.+) ;(.+) ;(.+) ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(ScheduleController.addLessonToSchedule,
        msg.from.username, false, match[1], match[2], match[3], match[4]))
})

bot.onText(/\/ahelp/, async (msg) => {
    await BotController.sendAdminHelp(msg.chat.id, commands)
})
