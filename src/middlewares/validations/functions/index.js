const { validationResult } = require("express-validator");
const ErrorResponse = require("../../../helpers/ErrorResponse");
const UserRepository = require("../../../repository/User");
const TeamRepository = require("../../../repository/Team");
const EventRepository = require("../../../repository/Event");
const AuthService = require("../../../services/auth");
const { GLOBAL_ADMIN, TEAM_ADMIN } = require("../../../constants");
// USER / AUTH
exports.emailIsUniqueValidator = async email => {
  const userFound = await UserRepository.findByEmail(email);
  if (userFound) {
    throw new ErrorResponse(400, undefined, "Email is already registered");
  }
};
exports.userExist = async id => {
  const userFound = await UserRepository.findById(id);
  if (!userFound) {
    throw new ErrorResponse(404, undefined, "User doesn't exist");
  }
};
exports.hasRole = (...roles) => {
  return (req, res, next) => {
    try {
      AuthService.validateRole(req.user, ...roles);
      next();
    } catch (error) {
      throw new ErrorResponse(error.code, error.message, error.data);
    }
  };
};
// TEAM

exports.teamExist = async (req, res, next) => {
  try {
    const id = req.params.teamId;
    const teamFound = await TeamRepository.getOneById(id);
    req.team = teamFound;
    next();
  } catch (err) {
    next(new ErrorResponse(400, "Operation Failed", "Team doesn't exist"));
  }
};
exports.isMember = (req, res, next) => {
  const filtered = req.team.members.filter(e => e.user._id === req.user._id);
  if (filtered.length <= 0 && req.user.role !== GLOBAL_ADMIN) {
    throw new ErrorResponse(
      400,
      "Operation Failed",
      "You're not a member of this team"
    );
  }
  next();
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
        err.code || 400,
        err.message || "Can't validate the token",
        err.data ||
          "Please provide an authentification token in Authorization header"
      )
    );
  }
};

// EVENTS
exports.eventExist = async id => {
  const eventFound = await EventRepository.findById(id);
  if (!eventFound) {
    throw new ErrorResponse(404, undefined, "Event doesn't exist");
  }
};
exports.teamHasEvent = () => {};

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
