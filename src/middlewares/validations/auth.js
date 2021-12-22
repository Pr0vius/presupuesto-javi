const { check } = require("express-validator");
const { validResult, emailIsUniqueValidator } = require("./functions");

const firstnameValidator = check("firstname")
  .isLength({ max: 50 })
  .withMessage("Name max length is 50 characaters");

const lastnameValidator = check("lastname")
  .isLength({ max: 50 })
  .withMessage("Name max length is 50 characaters");

const emailValidator = check("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Email is invalid");

const emailUnique = check("email")
  .custom(emailIsUniqueValidator)
  .withMessage("Email is already taken");

const passwordRequired = check("password")
  .notEmpty()
  .withMessage("Password is required");

const passwordLength = check("password")
  .isLength({ min: 6 })
  .withMessage("Password length must be at least 6 characters");

const imageValidator = check("img")
  .isURL()
  .withMessage("The image must be an url");

exports.registerValidations = [
  firstnameValidator,
  lastnameValidator,
  emailValidator,
  emailUnique,
  passwordRequired,
  passwordLength,
  imageValidator,
  validResult,
];

exports.loginValidations = [emailValidator, passwordRequired, validResult];
