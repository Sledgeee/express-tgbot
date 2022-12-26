const mongoose = require("mongoose");
const bluebird = require("bluebird");

const connectDb = () => {
  mongoose.Promise = bluebird;
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    maxPoolSize: 500,
  });
  return mongoose.connection;
};

const disconnectDb = () => {
  mongoose.Promise = bluebird;
  mongoose.disconnect();
  return mongoose.connection;
};

const dropCollection = async (name) => {
  await mongoose.connection.db.dropCollection(name);
};

module.exports = { connectDb, disconnectDb, dropCollection };
