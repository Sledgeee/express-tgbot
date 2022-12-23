const mongoose = require('mongoose')
const bluebird = require('bluebird')

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

module.exports = { connectDb, disconnectDb }
