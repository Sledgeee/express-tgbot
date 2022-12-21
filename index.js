const express = require('express')
const mongoose = require('mongoose')
const bluebird = require('bluebird')
const dayjs = require('dayjs')
const TelegramBot = require('node-telegram-bot-api')
const Birthday = require('./models/birthday')

const PORT = 3000
const app = express()
const bot = new TelegramBot('5849311402:AAFSPPkjQu7Xc0Ltbxfi83d6-NgkOgM6SE4', { polling: true })


bot.on('message', async (req) => {
    const docs = await Birthday.find()
    bot.sendMessage(req.chat.id, JSON.stringify(docs))
})

app.get('/test', () => {
    return 'test endpoint'
})

const startServer = () => {
    app.listen(PORT)
    console.log('App started on PORT %d', PORT)
}

const connectDb = () => {
    mongoose.Promise = bluebird
    mongoose.set('strictQuery', false)
    mongoose.connect('mongodb+srv://mongo:mongo@tgbot-cluser.6goodre.mongodb.net/?retryWrites=true&w=majority', {
        maxPoolSize: 500
    })
    return mongoose.connection
}

const disconnectDb = () => {
    mongoose.Promise = bluebird
    mongoose.disconnect()
    return mongoose.connection
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('close', disconnectDb)
    .once('open', startServer)
