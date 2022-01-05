const { check } = require("express-validator");
const { validResult, emailIsUniqueValidator } = require("./functions");

const firstnameValidator = check("firstname")
  .notEmpty()
  .withMessage("Firstname is required")
  .isLength({ max: 50 })
  .withMessage("Name max length is 50 characaters");

const lastnameValidator = check("lastname")
  .notEmpty()
  .withMessage("Lastname is required")
  .isLength({ max: 50 })
  .withMessage("Name max length is 50 characaters");

const emailValidator = check("email")
  .notEmpty()
  .withMessage("Email is required");
const emailRegex = check("email")
  .isEmail()
  .withMessage("Email is invalid")
  .optional();

const emailUnique = check("email")
  .custom(emailIsUniqueValidator)
  .withMessage("Email is already taken");

const passwordRequired = check("password")
  .notEmpty()
  .withMessage("Password is required");

const passwordLength = check("password")
  .isLength({ min: 6 })
  .withMessage("Password length must be at least 6 characters")
  .optional();

const imageValidator = check("img")
  .isURL()
  .withMessage("The image must be an url");

exports.registerValidations = [
  firstnameValidator,
  lastnameValidator,
  emailValidator,
  emailRegex,
  emailUnique,
  passwordRequired,
  passwordLength,
  imageValidator,
  validResult,
];

exports.loginValidations = [emailValidator, passwordRequired, validResult];
