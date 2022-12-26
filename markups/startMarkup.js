const startMarkup = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Розклад 📅", callback_data: "schedule" },
        { text: "Плейліст 🎥", callback_data: "playlist" },
      ],
      [{ text: "Графік проведення пар ⏰", callback_data: "timetable" }],
      [
        {
          text: "Посилання на Zoom 🔗",
          callback_data: "links",
        },
      ],
    ],
  }),
};

module.exports = startMarkup;
