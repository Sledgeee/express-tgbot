require('dotenv').config()
require('./commands/setupCommands')
require('./callbacks/setupCallbacks')

const { connectDb, disconnectDb } = require('./lib/mongo')

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('close', disconnectDb)
    .once('open', () => {
        require('./cron/setupCron')()
    })
