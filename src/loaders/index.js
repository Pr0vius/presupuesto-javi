require("colors");
const server = require("./express");
const config = require("../config");
const connectDatabase = require("./database");
const logger = require("../helpers/logger");

module.exports = async () => {
  await server.start();
  logger.info(
    `#####################################\n	Server is listening on PORT: ${config.port}\n      #####################################`
      .cyan
  );
  await connectDatabase();
};
