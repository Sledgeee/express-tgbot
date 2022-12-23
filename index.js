const { connectDb, disconnectDb } = require('./lib/mongo')

require('./commands/tech')
require('./commands/common')
require('./callbacks/start')
require('./callbacks/agree')

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('close', disconnectDb)
    .once('open', () => {
        require('./cron/setupCron')()
    })
