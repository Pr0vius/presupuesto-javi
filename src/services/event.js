const EventRepository = require("../repository/Event");

class EventService {
  async findAll() {
    return await EventRepository.findAll();
  }
  async create(event) {
    return await EventRepository.create(event);
  }
  async addExpenses(id, expenses) {
    await EventRepository.update(id, expenses);
  }
}

module.exports = new EventService();
