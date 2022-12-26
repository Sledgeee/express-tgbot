const { bot } = require("../lib/bot");
const BotController = require("../controllers/botController");

bot.on("callback_query", async (callback) => {
  try {
    switch (callback.data) {
      case "playlist":
        await BotController.sendPlaylist(callback.message.chat.id, "latest");
        break;
      case "schedule":
        await BotController.sendFullSchedule(callback.message.chat.id);
        break;
      case "timetable":
        await BotController.sendTimetable(callback.message.chat.id);
        break;
      case "links":
        await BotController.sendLinkMarkup(callback.message.chat.id);
        break;
    }
  } catch (err) {
    console.log(err);
  }
});
