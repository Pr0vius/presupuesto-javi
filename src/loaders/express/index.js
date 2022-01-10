const express = require("express");
const process = require("process");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("../../helpers/logger");
const { port, api } = require("../../config");
const ErrorResponse = require("../../helpers/ErrorResponse");

class ExpressServer {
  constructor() {
    this.app = express();
    this.port = port;
    this.prefix = api.prefix;
    this._middlewares();
    this._routes();
    this._errorHandler();
  }

  _middlewares() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }
  _routes() {
    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });
    this.app.use(`${this.prefix}`, require("../../routes/auth"));
    this.app.use(`${this.prefix}/team`, require("../../routes/team"));
    this.app.use(`${this.prefix}/events`, require("../../routes/event"));
    this.app.use(`${this.prefix}/users`, require("../../routes/user"));
    this.app.use("*", (req, res) => {
      throw new ErrorResponse(404, "Not Found", "This path doesn't exist");
    });
  }

  _errorHandler() {
    this.app.use(require("../../middlewares/errorHandler"));
  }

  async start() {
    this.app.listen(this.port, err => {
      if (err) {
        logger.error(err);
        process.env(1);
        return;
      }
    });
  }
}

module.exports = new ExpressServer();
