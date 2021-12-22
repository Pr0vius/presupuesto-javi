const ErrorResponse = require("../helpers/ErrorResponse");
const Success = require("../helpers/SuccessResponse");
const AuthService = require("../services/auth");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = AuthService.login(email, password);
    res.status(200).json(new Success(200, "Login success", data));
  } catch (err) {
    next(
      new ErrorResponse(
        err.code || 500,
        err.message || "Couldn't Login",
        err.data || "Something went wrong"
      )
    );
  }
};

exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, img } = req.body;
    const data = await AuthService.register({
      firstname,
      lastname,
      email,
      password,
      img,
    });
    res.status(200).json(new Success(200, "Register success", data));
  } catch (err) {
    next(
      new ErrorResponse(
        err.code || 500,
        err.message || "Couldn't Register",
        err.data || "Something went wrong"
      )
    );
  }
};
