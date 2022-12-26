const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  cron: {
    startOnStartup: Boolean,
    jobs: [
      {
        name: String,
        startOnStartup: Boolean,
      },
    ],
  },
});

module.exports = mongoose.model("App", appSchema);
