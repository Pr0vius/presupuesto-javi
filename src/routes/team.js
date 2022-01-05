const { Router } = require("express");
const {
  getTeamsValidations,
  createTeamValidations,
  getTeamByIdValidations,
  updateTeamValidations,
  deleteTeamValidations,
  addTeamMemberValidations,
  updateTeamMemberValidations,
  removeTeamMemberValidations,
} = require("../middlewares/validations/team");
const {
  getEventsValidator,
  createEventValidator,
  deleteEventValidator,
  addExpensesValidator,
} = require("../middlewares/validations/event");
const {
  getTeams,
  getTeam,
  createTeam,
  deleteTeam,
  updateTeam,
  addMember,
  updateMember,
  removeMember,
  getTeamEvents,
  createTeamEvent,
  deleteTeamEvent,
  addTeamEventExpenses,
} = require("../controllers/team");
const { getEvents } = require("../services/team");
const router = Router();

router
  .route("/")
  .get(getTeamsValidations, getTeams)
  .post(createTeamValidations, createTeam);
router
  .route("/:teamId")
  .get(getTeamByIdValidations, getTeam)
  .put(updateTeamValidations, updateTeam)
  .delete(deleteTeamValidations, deleteTeam);
router
  .route("/:teamId/member/:memberId")
  .post(addTeamMemberValidations, addMember)
  .put(updateTeamMemberValidations, updateMember)
  .delete(removeTeamMemberValidations, removeMember);
router
  .route("/:teamId/event")
  .get(getEventsValidator, getTeamEvents)
  .post(createEventValidator, createTeamEvent);
router
  .route("/:teamId/event/:eventId")
  .post(addExpensesValidator, addTeamEventExpenses)
  .delete(deleteEventValidator, deleteTeamEvent);
module.exports = router;
