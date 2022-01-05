const ErrorResponse = require("../helpers/ErrorResponse");
const Team = require("../models/Team");

class TeamRepository {
  async getAll() {
    return await Team.find();
  }
  async create(team) {
    return await Team.create(team);
  }
  async getOneById(id) {
    const team = await Team.findById(id)
      .populate("members.user", "_id -email -password -__v", "User")
      .populate("events","_id +firstname +lastname","Event");
    if (!team) {
      throw new ErrorResponse(404, undefined, "Team doesn't exist");
    }
    return team;
  }
  async update(id, update) {
    return await Team.findByIdAndUpdate(id, update);
  }
  async delete(id) {
    await Team.findByIdAndDelete(id);
  }
}

module.exports = new TeamRepository();
