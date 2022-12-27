const { bot } = require("../lib/bot");
const PlaylistController = require("../controllers/playlistController");
const TimetableController = require("../controllers/timetableController");
const WeekController = require("../controllers/weekController");
const ScheduleController = require("../controllers/scheduleController");
const dynamicMarkup = require("../markups/dynamicMarkup");
const ZoomController = require("./zoomController");
const { getJobsMenu } = require("../lib/cron");

class BotController {
  static async sendPlaylist(chatId, mode) {
    await bot.sendMessage(chatId, await PlaylistController.getPlaylist(mode));
  }

  static async sendTimetable(chatId) {
    const message = await sendLoadingText(chatId);
    await bot.editMessageText(
      await TimetableController.createPlainTimetable(),
      {
        chat_id: message.chat.id,
        message_id: message.message_id,
      }
    );
  }

  static async sendWeek(chatId) {
    await bot.sendMessage(chatId, await WeekController.getWeek());
  }

  static async sendLinkMarkup(chatId) {
    const docs = await ZoomController.find();
    if (docs.length > 0) {
      const keyboardItems = [];
      for (const doc of docs) {
        console.log(doc);
        console.log(ltype);
        keyboardItems.push([
          {
            text: `${doc.lesson.shortName} ${doc.lesson.type}`,
            callback_data: `link_${doc.id}`,
          },
        ]);
      }
      bot.sendMessage(chatId, "Оберіть предмет:", dynamicMarkup(keyboardItems));
    } else {
      bot.sendMessage(chatId, "Жодного посилання на пару ще не додано ⚠️");
    }
  }

  static async sendFullSchedule(chatId) {
    const message = await sendLoadingText(chatId);
    bot.editMessageText(await ScheduleController.generateFullPlainSchedule(), {
      chat_id: message.chat.id,
      message_id: message.message_id,
      parse_mode: "HTML",
    });
  }

  static async sendTodaysSchedule(chatId, sendPreloadText = true) {
    if (sendPreloadText) {
      const message = await sendLoadingText(chatId);
      await bot.editMessageText(
        await ScheduleController.generateTodaysPlainSchedule(),
        {
          chat_id: message.chat.id,
          message_id: message.message_id,
        }
      );
    } else {
      await bot.sendMessage(
        chatId,
        await ScheduleController.generateTodaysPlainSchedule()
      );
    }
  }

  static async sendNearest(chatId) {
    try {
      await bot.sendMessage(
        chatId,
        await ScheduleController.getNearestLesson()
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async sendCock(chatId) {
    try {
      const cockSize = Math.floor(Math.random() * 50) + 1;
      const reactionOnSize =
        cockSize == 50
          ? "🫡"
          : cockSize >= 35
          ? "🤩"
          : cockSize >= 10
          ? "😎"
          : "🧐";
      await bot.sendMessage(chatId, `Твій 🐓 ${cockSize} см ${reactionOnSize}`);
    } catch (err) {
      console.log(err);
    }
  }

  static async sendUserHelp(chatId, commands) {
    try {
      let help = "";
      Object.values(commands).forEach((value) => {
        help += value.help;
      });
      await bot.sendMessage(chatId, "Перелік команд юзера:\n" + help);
    } catch (err) {
      console.log(err);
    }
  }

  static async sendAdminHelp(chatId, commands) {
    try {
      let help = "";
      commands.forEach((command) => {
        help += command;
      });
      await bot.sendMessage(
        chatId,
        "Перелік команд адміністратора:\n" +
          help +
          "\n<b>УВАГА! Параметри команди пишуться з ; в початку. Приклад: /command ;parameter</b>",
        {
          parse_mode: "HTML",
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async sendJobsMenu(chatId) {
    await bot.sendMessage(chatId, "Оберіть задачу: ", getJobsMenu());
  }
}

const sendLoadingText = async (chatId) => {
  return await bot.sendMessage(chatId, "Генерація...");
};

module.exports = BotController;
