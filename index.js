const { connectDb, disconnectDb } = require('./lib/mongo')

require('./commands/adminCommands')
require('./commands/userCommands')
require('./callbacks/startCallbacks')
require('./callbacks/agreeCallbacks')

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('close', disconnectDb)
    .once('open', () => {
        require('./cron/setupCron')()
    })
