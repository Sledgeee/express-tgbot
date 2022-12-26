const { bot } = require("../lib/bot");
const ZoomController = require("../controllers/zoomController");

bot.on("callback_query", async (callback) => {
  try {
    const containsLink = callback.data.includes("link_");
    if (containsLink) {
      const linkId = callback.data.split("_")[1];
      bot.sendMessage(
        callback.message.chat.id,
        await ZoomController.findById(linkId)
      );
    }
  } catch (err) {
    console.log(err);
  }
});
