const { Router } = require("express");
const {
  loginValidations,
  registerValidations,
} = require("../middlewares/validations/auth");
const { login, register } = require("../controllers/auth");

const router = Router();

router.post("/login", loginValidations, login);
router.post("/register", registerValidations, register);

module.exports = router;
