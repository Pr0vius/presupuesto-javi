const { validationResult } = require("express-validator");
const ErrorResponse = require("../../../helpers/ErrorResponse");
const userRepo = require("../../../repository/User");
const AuthService = require("../../../services/auth");

exports.emailIsUniqueValidator = async email => {
  const userFound = await userRepo.findByEmail(email);
  if (userFound) {
    throw new ErrorResponse(400, undefined, "Username already exist");
  }
};

exports.validateJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = await AuthService.validateToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(
      new ErrorResponse(
        err.status || 400,
        err.message || "Can't validate the token",
        err.data ||
          "Please provide an authentification token in Authorization header"
      )
    );
  }
};

exports.validResult = (req, res, next) => {
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
