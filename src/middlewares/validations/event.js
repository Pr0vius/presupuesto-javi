const { param, body } = require("express-validator");
const {
  validateJWT,
  teamExist,
  eventExist,
  validResult,
  isMember,
  hasRole,
} = require("./functions");
const { TEAM_MEMBER, TEAM_ADMIN, GLOBAL_ADMIN } = require("../../constants");

const checkEventExist = param("eventId")
  .custom(eventExist)
  .withMessage("The event doesn't exist");
const nameIsRequired = body("name")
  .notEmpty()
  .withMessage("The name is required");
const nameIsString = body("name")
  .isString()
  .withMessage("The name must be a String")
  .optional();
const descriptionIsRequired = body("description")
  .notEmpty()
  .withMessage("Descriptions is required");
const descriptionIsString = body("description")
  .isString()
  .withMessage("Description must be a String")
  .optional();
const dateIsRequired = body("date").notEmpty().withMessage("Date is Required");
const dateIsString = body("date")
  .notEmpty()
  .isString()
  .withMessage("Date must be a string");

const productNameIsRequired = body("product_name")
  .notEmpty()
  .withMessage("Product name is required");
const productNameIsString = body("product_name")
  .isString()
  .withMessage("Product name must be a String")
  .optional();
const amountIsRequired = body("amount")
  .notEmpty()
  .withMessage("Amount is required");
const amountIsNumeric = body("amount")
  .isNumeric()
  .withMessage("Amount must be a Number")
  .optional();
const priceIsRequired = body("price")
  .notEmpty()
  .withMessage("Price is required");
const priceIsNumeric = body("price")
  .isNumeric()
  .withMessage("Price must be a Number")
  .optional();

exports.getEventsValidator = [validateJWT, teamExist, validResult];
exports.createEventValidator = [
  validateJWT,
  teamExist,
  isMember,
  hasRole(TEAM_ADMIN, GLOBAL_ADMIN),
  nameIsRequired,
  nameIsString,
  descriptionIsRequired,
  descriptionIsString,
  dateIsRequired,
  dateIsString,
  validResult,
];
exports.deleteEventValidator = [
  validateJWT,
  teamExist,
  isMember,
  hasRole(TEAM_ADMIN, GLOBAL_ADMIN),
  checkEventExist,
  validResult,
];
exports.addExpensesValidator = [
  validateJWT,
  teamExist,
  isMember,
  hasRole(TEAM_MEMBER, TEAM_ADMIN, GLOBAL_ADMIN),
  productNameIsRequired,
  productNameIsString,
  amountIsRequired,
  amountIsNumeric,
  priceIsRequired,
  priceIsNumeric,
  checkEventExist,
  validResult,
];
