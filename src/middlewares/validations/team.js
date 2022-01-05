const { param, body } = require("express-validator");
const {
  validResult,
  validateJWT,
  teamExist,
  userExist,
  isMember,
  hasRole,
} = require("./functions");
const { GLOBAL_ADMIN, TEAM_ADMIN } = require("../../constants");
const nameRequired = body("name")
  .notEmpty()
  .withMessage("Team name is required");
const nameIsString = body("name")
  .isString()
  .withMessage("Name must be an String")
  .optional();
const budgetRequired = body("budget")
  .notEmpty()
  .withMessage("Budget is required");
const budgetIsNumeric = body("budget")
  .isNumeric()
  .withMessage("Budget field must be a number")
  .optional();
const memberExist = param("memberId")
  .custom(userExist)
  .withMessage("User doesn't exist");
const positionRequired = body("position")
  .notEmpty()
  .withMessage("Position is Required");
const positionIsString = body("position")
  .isString()
  .withMessage("Position must be an string")
  .optional();
exports.getTeamsValidations = [validateJWT, validResult];
exports.createTeamValidations = [
  validateJWT,
  nameRequired,
  nameIsString,
  budgetRequired,
  budgetIsNumeric,
  validResult,
];
exports.getTeamByIdValidations = [validateJWT, teamExist, validResult];
exports.updateTeamValidations = [
  validateJWT,
  teamExist,
  isMember,
  hasRole(GLOBAL_ADMIN, TEAM_ADMIN),
  nameIsString,
  budgetIsNumeric,
  validResult,
];
exports.deleteTeamValidations = [
  validateJWT,
  teamExist,
  isMember,
  hasRole(GLOBAL_ADMIN, TEAM_ADMIN),
  validResult,
];
exports.addTeamMemberValidations = [
  validateJWT,
  teamExist,
  memberExist,
  isMember,
  hasRole(GLOBAL_ADMIN, TEAM_ADMIN),
  positionRequired,
  positionIsString,
  validResult,
];
exports.updateTeamMemberValidations = [
  validateJWT,
  teamExist,
  memberExist,
  isMember,
  hasRole(GLOBAL_ADMIN, TEAM_ADMIN),
  positionRequired,
  positionIsString,
  validResult,
];
exports.removeTeamMemberValidations = [
  validateJWT,
  teamExist,
  isMember,
  hasRole(GLOBAL_ADMIN, TEAM_ADMIN),
  memberExist,
  validResult,
];
