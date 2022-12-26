const { bot } = require("../lib/bot");
const startMarkup = require("../markups/startMarkup");
const BotController = require("../controllers/botController");

const { BOT_TAG } = process.env;
const commands = {
  start: {
    command: "/start" + BOT_TAG,
    help: "/start - Розпочати діалог з ботом\n",
  },
  playlist: {
    command: "/playlist" + BOT_TAG,
    help: "/playlist - Отримати плейліст за поточний семестр\n",
  },
  playlists: {
    command: "/playlists" + BOT_TAG,
    help: "/playlists - Отримати всі доступні плейлісти\n",
  },
  timetable: {
    command: "/timetable" + BOT_TAG,
    help: "/timetable - Отримати графік початку та кінця пар\n",
  },
  week: {
    command: "/week" + BOT_TAG,
    help: "/week - Який зараз тиждень?\n",
  },
  link: {
    command: "/zoom" + BOT_TAG,
    help: "/zoom - Отримати посилання на Zoom\n",
  },
  schedule: {
    command: "/schedule" + BOT_TAG,
    help: "/schedule - Отримати розклад пар на тиждень\n",
  },
  scheduleToday: {
    command: "/schedule_today" + BOT_TAG,
    help: "/schedule_today - Отримати розклад пар на сьогоднішній день\n",
  },
  timeToNearestLesson: {
    command: "/nearest" + BOT_TAG,
    help: "/nearest - Отримати найближчу пару та час до її початку\n",
  },
  cock: {
    command: "/cock" + BOT_TAG,
    help: "/cock - 🐓\n",
  },
};

bot.on("message", async (msg) => {
  const message = msg.text?.includes(BOT_TAG) ? msg.text : msg.text + BOT_TAG;
  switch (message) {
    case commands.start.command:
      await bot.sendMessage(
        msg.chat.id,
        "Обери, що тобі потрібно:",
        startMarkup
      );
      break;
    case commands.playlist.command:
      await BotController.sendPlaylist(msg.chat.id, "latest");
      break;
    case commands.playlists.command:
      await BotController.sendPlaylist(msg.chat.id, "all");
      break;
    case commands.timetable.command:
      await BotController.sendTimetable(msg.chat.id);
      break;
    case commands.week.command:
      await BotController.sendWeek(msg.chat.id);
      break;
    case commands.link.command:
      await BotController.sendLinkMarkup(msg.chat.id);
      break;
    case commands.schedule.command:
      await BotController.sendFullSchedule(msg.chat.id);
      break;
    case commands.scheduleToday.command:
      await BotController.sendTodaysSchedule(msg.chat.id);
      break;
    case commands.timeToNearestLesson.command:
      await BotController.sendNearest(msg.chat.id);
      break;
    case commands.cock.command:
      await BotController.sendCock(msg.chat.id);
      break;
    case "/help" + BOT_TAG:
      await BotController.sendUserHelp(msg.chat.id, commands);
      break;
  }
});
