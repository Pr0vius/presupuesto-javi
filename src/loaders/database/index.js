const mongoose = require("mongoose");
const { database } = require("../../config");
const logger = require("../../helpers/logger");

const connectDatabase = async () => {
  try {
    const CONNECTION = await mongoose.connect(database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`DB is CONNECTED ${CONNECTION.connection.host}`);
  } catch (err) {
    logger.error(`Error at Database connection\n ${err}`);
  }
};

module.exports = connectDatabase;
