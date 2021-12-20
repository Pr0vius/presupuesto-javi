const process = require("process");
require("dotenv").config();

// const parseBoolean = value => {
//   let boolValue = value === "true" ? true : false;
//   return boolValue;
// };

module.exports = {
  port: process.env.PORT || 3000,
  api: {
    prefix: "/api/v2",
  },
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
};
