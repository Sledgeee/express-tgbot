const { bot } = require("../lib/bot")
const AdminController = require('../controllers/adminController')
const BirthdayController = require('../controllers/birthdayController')
const PlaylistController = require('../controllers/playlistController')
const LessonController = require('../controllers/lessonController')
const parseIsu1 = require("../lib/parseIsu1")
const TeacherController = require("../controllers/teacherController")

const responseMessages = {
    success: 'Виконано ✅',
    error: 'Операція відмінена або сталась помилка ❌',
    noRights: 'У вас немає прав ❌\nДля отримання доступу до цієї команди зверніться до @'
}

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

bot.onText(/\/addAdmin ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(AdminController.addAdmin, 
        msg.from.username, true, match[1]))
})

bot.onText(/\/addTeacher ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(TeacherController.createTeacher, 
        msg.from.username, false, match[1]))
})

bot.onText(/\/addBirthday ;(.+) ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(BirthdayController.addBirthday, 
        msg.from.username, false, match[1], match[2]))
})

bot.onText(/\/addPlaylist ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(PlaylistController.addNewPlaylist, 
        msg.from.username, false, match[1]))
})

bot.onText(/\/updateWeek/, (msg) => {
    parseIsu1(msg.chat.id, true)
})

bot.onText(/\/seedLessonTypes/, async (msg) => {
    bot.sendMessage(msg.chat.id, await callAsync(LessonController.seedLessonTypes, 
        msg.from.username))
})

bot.onText(/\/addLesson ;(.+) ;(.+) ;(.+) ;(.+)/, async (msg, match) => {
    bot.sendMessage(msg.chat.id, await callAsync(LessonController.createLesson, 
        msg.from.username, false, match[1], match[2], match[3], match[4]))
})
