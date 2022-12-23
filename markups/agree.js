const agreeMarkup = (callbackFor) => {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '✅', callback_data: `yes_${callbackFor}`}, 
                    {text: '❌', callback_data: `no_${callbackFor}`}
                ]
            ],
            one_time_keyboard: true,
            resize_keyboard: true
        })
    }
}

module.exports = agreeMarkup
