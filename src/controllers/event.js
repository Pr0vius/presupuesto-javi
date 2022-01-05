const ErrorResponse = require("../helpers/ErrorResponse");
const Success = require("../helpers/SuccessResponse");
const EventService = require("../services/event");

exports.getAll = async (req, res, next) => {
  try {
    const events = await EventService.findAll();
    res.status(200).json(new Success(200, "Events List", events));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't find Event List",
        error.data || "Something went wrong"
      )
    );
  }
};
