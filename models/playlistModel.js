const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  link: String,
});

module.exports = mongoose.model("Playlist", playlistSchema);
