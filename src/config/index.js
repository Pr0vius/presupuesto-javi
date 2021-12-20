const process = require("process");
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  api: {
    prefix: "/api/v2",
  },
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
  database: {
    url: process.env.MONGODB_URI,
  },
};
