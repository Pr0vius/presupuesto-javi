const { body } = require("express-validator");
const { GLOBAL_ADMIN } = require("../../constants");
const {
  validateJWT,
  validResult,
  hasRole,
  emailIsUniqueValidator,
  validateRole,
} = require("./functions");

const firstnameValidator = body("firstname")
  .isString()
  .withMessage("Firstname must be an String")
  .isLength({ max: 50 })
  .withMessage("Name max length is 50 characaters")
  .optional();

const lastnameValidator = body("lastname")
  .isString()
  .withMessage("Lastname must be an String")
  .isLength({ max: 50 })
  .withMessage("Name max length is 50 characaters")
  .optional();
const emailRegex = body("email")
  .isEmail()
  .withMessage("Email is invalid")
  .optional();
const emailUnique = body("email")
  .custom(emailIsUniqueValidator)
  .withMessage("Email is already taken")
  .optional();
const passwordLength = body("password")
  .isLength({ min: 6 })
  .withMessage("Password length must be at least 6 characters")
  .optional();
const imageValidator = body("img")
  .isURL()
  .withMessage("The image must be an url")
  .optional();
const roleIsString = body("role")
  .isString()
  .withMessage("Role must be an String")
  .optional();
const roleIsValid = body("role")
  .custom(validateRole)
  .withMessage("Role is invalid")
  .optional();
exports.getAllUsersValidations = [validateJWT, validResult];
exports.getUserValidations = [validateJWT, validResult];
exports.updateUserValidations = [
  validateJWT,
  hasRole(GLOBAL_ADMIN),
  firstnameValidator,
  lastnameValidator,
  emailRegex,
  emailUnique,
  passwordLength,
  imageValidator,
  roleIsString,
  roleIsValid,
  validResult,
];
