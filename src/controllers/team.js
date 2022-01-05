const TeamService = require("../services/team");
const ErrorResponse = require("../helpers/ErrorResponse");
const Success = require("../helpers/SuccessResponse");

exports.getTeams = async (req, res, next) => {
  try {
    const data = await TeamService.findAll();
    await res.status(200).json(new Success(200, "All Teams", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't get team list",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.createTeam = async (req, res, next) => {
  try {
    const { name, budget } = req.body;
    const data = await TeamService.create({
      name,
      budget,
    });
    res.status(201).json(new Success(200, "Team creation succesful", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't create the team",
        error.data || "Something went wrong"
      )
    );
  }
};

exports.getTeam = async (req, res, next) => {
  try {
    res.status(200).json(new Success(200, "Team By Id", req.team));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't find the team",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.updateTeam = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    const data = await TeamService.update(req.params.teamId, { name, members });
    res.status(200).json(new Success(200, "Team updated succesfully", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couln't update the team",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.deleteTeam = async (req, res, next) => {
  try {
    await TeamService.delete(req.params.teamId);
    res
      .status(200)
      .json(
        new Success(
          200,
          "Team deleted succesfully",
          `Team with id ${req.params.id} deleted`
        )
      );
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't delete team",
        error.data || "Something went wrong"
      )
    );
  }
};

exports.addMember = async (req, res, next) => {
  try {
    const user = { user: req.params.memberId, position: req.body.position };
    const data = await TeamService.addMember(req.team, user);
    res
      .status(201)
      .json(new Success(200, "Member added to the team succesfully", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't add member to the team",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.removeMember = async (req, res, next) => {
  try {
    const data = await TeamService.removeMember(req.team, req.params.memberId);
    res
      .status(200)
      .json(new Success(200, "Team Member removed successfully", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't remove the team member",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.updateMember = async (req, res, next) => {
  try {
    const data = await TeamService.updateMember(
      req.team,
      req.params.memberId,
      req.body.position
    );
    res
      .status(201)
      .json(new Success(200, "Team member updated successfully", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't update the team member",
        error.data || "Something went wrong"
      )
    );
  }
};

exports.getTeamEvents = (req, res, next) => {
  try {
    const data = TeamService.getEvents(req.team);
    res.status(200).json(new Success(200, "Team Events", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't get the team events",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.createTeamEvent = async (req, res, next) => {
  try {
    const { name, description, date } = req.body;
    const data = await TeamService.createEvent({
      name,
      description,
      date,
      team: req.team._id,
    });
    res.status(200).json(new Success(200, "Team Event created", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't create the event",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.addTeamEventExpenses = async (req, res, next) => {
  try {
    const { product_name, amount, price } = req.body;
    const data = await TeamService.addEventExpenses(
      req.team,
      req.params.eventId,
      {
        product_name,
        amount,
        price,
      }
    );
    res.status(200).json(new Success(200, "Team Event Expenses added", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't add expenses to the event",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.deleteTeamEvent = async (req, res, next) => {
  try {
    const data = await TeamService.deleteEvent(req.team, req.params.eventId);
    res.status(200).json(new Success(200, "Team Events deleted", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't delete the event",
        error.data || "Something went wrong"
      )
    );
  }
};
