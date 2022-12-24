require('dotenv').config()
require('./commands/adminCommands')
require('./commands/userCommands')
require('./callbacks/startCallbacks')
require('./callbacks/agreeCallbacks')

const { connectDb, disconnectDb } = require('./lib/mongo')

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('close', disconnectDb)
    .once('open', () => {
        require('./cron/setupCron')()
    })
