const jobActionsMarkup = (jobName, jobStatus) => {
  let items;
  if (jobStatus === "✅") {
    items = [
      [
        {
          text: "Перезапустити 🟡",
          callback_data: "jobaction_restart_" + jobName,
        },
      ],
      [{ text: "Зупинити 🔴", callback_data: "jobaction_stop_" + jobName }],
    ];
  } else {
    items = [
      [{ text: "Запустити 🟢", callback_data: "jobaction_start_" + jobName }],
    ];
  }
  items.push([{ text: "Закрити меню ❌", callback_data: "jobaction_close" }]);
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: items,
    }),
  };
};

module.exports = jobActionsMarkup;
