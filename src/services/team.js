const TeamRepository = require("../repository/Team");
const EventService = require("./event");
const EventRepository = require("../repository/Event");
const ErrorResponse = require("../helpers/ErrorResponse");

class TeamService {
  async findAll() {
    return await TeamRepository.getAll();
  }
  async create(team) {
    const newTeam = await TeamRepository.create(team);
    return newTeam;
  }
  async findById(id) {
    return await TeamRepository.getOneById(id);
  }
  async update(id, team) {
    let update = {};
    const { name, budget } = team;
    if (name) {
      update.name = name;
    }
    if (budget) {
      update.budget = budget;
    }
    await TeamRepository.update(id, update);
  }
  async delete(id) {
    return await TeamRepository.delete(id);
  }
  // MEMBER
  async addMember(teamId, member) {
    const team = await TeamRepository.getOneById(teamId);
    team.members.push(member);
    await TeamRepository.update(teamId, team);
    return team;
  }
  async updateMember(team, memberId, update) {
    const mapped = team.members.map(e => {
      console.log(e.user._id.toString(), memberId);
      if (e.user._id.toString() === memberId) {
        e.position = update;
      }
      return e;
    });
    team.members = mapped;
    await TeamRepository.update(team._id, { members: mapped });
    return team;
  }
  async removeMember(team, memberId) {
    const filtered = team.members.filter(e => e.user._id !== memberId);
    if (filtered.length === team.members.length) {
      throw new ErrorResponse(
        400,
        "Operation failed",
        "User is not on the team"
      );
    }
    const update = filtered.map(e => {
      return { user: e.user._id, position: e.position };
    });
    await TeamRepository.update(team._id, { members: update });
    return {
      _id: team._id,
      name: team.name,
      budget: team.budget,
      events: team.events,
      members: filtered,
    };
  }
  // EVENT
  getEvents(team) {
    return team.events;
  }
  async createEvent(team, event) {
    const createdEvent = await EventService.create(event);
    team.events.push(createdEvent._id);
    await TeamRepository.update(team._id, team);
    return createdEvent;
  }
  async addEventExpenses(team, eventId, expenses) {
    let totalPrice = 0;
    expenses.forEach(e => {
      const totalCurrent = e.price * e.amount;
      totalPrice += totalCurrent;
      if (totalPrice > team.budget) {
        throw new ErrorResponse(
          400,
          "Couldn't add event expenses",
          "Expenses exceeded team funds"
        );
      }
    });
    team.budget -= totalPrice;
    await EventRepository.update(eventId, {
      expenses: [...expenses],
    });
    return [...expenses];
  }
  async deleteEvent(team, eventId) {
    const filtered = team.events.filter(e => e._id !== eventId);
    if (filtered.length === team.events.length) {
      throw new ErrorResponse(
        400,
        "Operation failed",
        "Event is not on the team"
      );
    }
    const update = filtered.map(e => e._id);
    await TeamRepository.update(team._id, { events: update });
    return {
      _id: team._id,
      name: team.name,
      budget: team.budget,
      members: team.members,
      events: filtered,
    };
  }
}

module.exports = new TeamService();
