const dynamicMarkup = (keyboardItems) => {
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: keyboardItems,
    }),
  };
};

module.exports = dynamicMarkup;
