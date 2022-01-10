const ErrorResponse = require("../helpers/ErrorResponse");
const Success = require("../helpers/SuccessResponse");
const UserService = require("../services/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(200).json(new Success(200, "All users", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't get the user list",
        error.data || "Something went wrong"
      )
    );
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, img, role } = req.body;
    const data = await UserService.updateUser(req.params.userId, {
      firstname,
      lastname,
      email,
      password,
      img,
      role,
    });
    res.status(200).json(new Success(200, "User Updated", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't update the user",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params.userId);
    res.status(200).json(new Success(200, "User finded", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't get the user",
        error.data || "Something went wrong"
      )
    );
  }
};
