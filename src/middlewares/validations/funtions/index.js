const { validationResult } = require("express-validator");
const ErrorResponse = require("../../../helpers/ErrorResponse");
const userRepo = require("../../../repository/User");

const emailIsUniqueValidator = async email => {
  const userFound = await userRepo.findByEmail(email);
  if (userFound) {
    throw new ErrorResponse(400, undefined, "Username already exist");
  }
};

const validResult = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    throw new ErrorResponse(
      400,
      "Validation Error",
      err.array().map(e => e.msg)
    );
  }
  next();
};

module.export = {
  emailIsUniqueValidator,
  validResult,
};
