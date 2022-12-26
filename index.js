const bootstrap = () => {
  try {
    require("dotenv").config();
    require("./lib/logger");
    require("./commands");
    require("./callbacks");

    const { connectDb, disconnectDb } = require("./lib/mongo");

    connectDb()
      .on("error", console.log)
      .on("disconnected", connectDb)
      .on("close", disconnectDb)
      .once("open", async () => {
        await require("./lib/cron").setupCron();
      });
  } catch (err) {
    console.log(err);
  }
};

bootstrap();
