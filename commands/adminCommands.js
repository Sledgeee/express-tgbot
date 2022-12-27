const { bot } = require("../lib/bot");
const AdminController = require("../controllers/adminController");
const BirthdayController = require("../controllers/birthdayController");
const PlaylistController = require("../controllers/playlistController");
const LessonController = require("../controllers/lessonController");
const parseIsu1 = require("../lib/parseIsu1");
const TeacherController = require("../controllers/teacherController");
const ScheduleController = require("../controllers/scheduleController");
const BotController = require("../controllers/botController");
const ZoomController = require("../controllers/zoomController");
const AppController = require("../controllers/appController");
const {
  stopCron,
  startCron,
  getJobsMenu,
  jobsStatus,
  restartCron,
} = require("../lib/cron");

const responseMessages = {
  success: "Виконано ✅",
  error: "Операція відмінена або сталась помилка ❌",
  noRights:
    "У вас немає прав ❌\nДля отримання доступу до цієї команди зверніться до @",
};

const commands = [];

const callAsyncV1 = async (func, username, superRights = false, ...args) => {
  const ownerInfo = await AdminController.getOwner();
  const { isOwner, isAdmin } = await AdminController.checkRights(username);
  return superRights
    ? isOwner
      ? await func(...args)
      : responseMessages.noRights + ownerInfo.username
    : isAdmin
    ? await func(...args)
    : responseMessages.noRights + ownerInfo.username;
};

const callAsyncV2 = async (func, username, superRights = false, ...args) => {
  const ownerInfo = await AdminController.getOwner();
  const { isOwner, isAdmin } = await AdminController.checkRights(username);
  return superRights
    ? isOwner
      ? (await func(...args))
        ? responseMessages.success
        : responseMessages.error
      : responseMessages.noRights + ownerInfo.username
    : isAdmin
    ? (await func(...args))
      ? responseMessages.success
      : responseMessages.error
    : responseMessages.noRights + ownerInfo.username;
};

bot.onText(/\/logs/, async (msg) => {
  bot.sendDocument(msg.chat.id, await AdminController.getLogs());
});

commands.push(
  "/addTeacher - Додати викладача. Параметри: ;[ПІБ (Приклад: Лисенко С.М.)]\n"
);
bot.onText(/\/addTeacher ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV2(
      TeacherController.createTeacher,
      msg.from.username,
      false,
      match[1]
    )
  );
});

commands.push(
  "/addBirthday - Додати студента до списку ДР. Параметри: ;[Прізвище Ім'я] ;[Дата (Приклад: 18.08)]\n"
);
bot.onText(/\/addBirthday ;(.+) ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV2(
      BirthdayController.addBirthday,
      msg.from.username,
      false,
      match[1],
      match[2]
    )
  );
});

commands.push("/addPlaylist - Додати плейліст. Параметри: ;[Посилання]\n");
bot.onText(/\/addPlaylist ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV2(
      PlaylistController.addNewPlaylist,
      msg.from.username,
      false,
      match[1]
    )
  );
});

commands.push(
  "/updateWeek - Синхронізація тижня з isu1 (Чисельник/Знаменник)\n"
);
bot.onText(/\/updateWeek/, (msg) => {
  parseIsu1(msg.chat.id, true);
});

commands.push(
  "/addLesson - Додати предмет. Параметри: ;[Назва] [Абревіатура] ;[Типи (Приклад: пр., лаб., лекц.)] ;[Викладач (Приклад: Лисенко С.М.)]\n"
);
bot.onText(/\/addLesson ;(.+) ;(.+) ;(.+) ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV2(
      LessonController.createLesson,
      msg.from.username,
      false,
      match[1],
      match[2],
      match[3],
      match[4]
    )
  );
});

commands.push(
  "/appendSchedule - Додати пару до розкладу. Параметри: ;[День (Приклад: Понеділок)]" +
    ";[Номер пари] ;[Коротка назва пари (Приклад: ПВС)] ;[Тип (Приклад: пр.)]" +
    ";[Тиждень. (Приклад: Чисельник). Потрібно вказувати -, якщо тижня немає]\n"
);
bot.onText(
  /\/appendSchedule ;(.+) ;(.+) ;(.+) ;(.+) ;(.+)/,
  async (msg, match) => {
    bot.sendMessage(
      msg.chat.id,
      await callAsyncV2(
        ScheduleController.addLessonToSchedule,
        msg.from.username,
        false,
        match[1],
        match[2],
        match[3],
        match[4],
        match[5]
      )
    );
  }
);

commands.push(
  "/addZoom - Додати Zoom посилання на пару. Параметри: ;[Коротка назва предмету" +
    "(Приклад: ;ПВС)] ;[Тип пари, можна вказувати декілька через кому (Приклад: ;пр., лаб.)]" +
    " ;[Посилання]\n"
);
bot.onText(/\/addZoom ;(.+) ;(.+) ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV2(
      ZoomController.addZoom,
      msg.from.username,
      false,
      match[1],
      match[2],
      match[3]
    )
  );
});

commands.push("\n/admin new - Для супер адміна\n");
bot.onText(/\/admin new ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV2(
      AdminController.addAdmin,
      msg.from.username,
      true,
      match[1]
    )
  );
});

commands.push("/admin collection drop - Для супер адміна\n");
bot.onText(/\/admin collection drop ;(.+)!/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV2(
      AdminController.clearCollection,
      msg.from.username,
      false,
      match[1]
    )
  );
});

commands.push("/admin cfg default - Для супер адміна\n");
bot.onText(/\/admin cfg default/, async (msg) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV2(
      AppController.applyDefaultSettings,
      msg.from.username,
      true
    )
  );
});

commands.push("/job start - Для супер адміна\n");
bot.onText(/\/job start ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV1(startCron, msg.from.username, true, match[1])
  );
});

commands.push("/job stop - Для супер адміна\n");
bot.onText(/\/job stop ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV1(stopCron, msg.from.username, true, match[1])
  );
});

commands.push("/job restart - Для супер адміна\n");
bot.onText(/\/job restart ;(.+)/, async (msg, match) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV1(restartCron, msg.from.username, true, match[1])
  );
});

commands.push("/job menu - Для супер адміна\n");
bot.onText(/\/job menu/, async (msg) => {
  await callAsyncV1(
    await BotController.sendJobsMenu,
    msg.from.username,
    true,
    msg.chat.id
  );
});

commands.push("/job status - Для супер адміна\n");
bot.onText(/\/job status/, async (msg) => {
  bot.sendMessage(
    msg.chat.id,
    await callAsyncV1(jobsStatus, msg.from.username, true)
  );
});

bot.onText(/\/ahelp/, async (msg) => {
  await BotController.sendAdminHelp(msg.chat.id, commands);
});
