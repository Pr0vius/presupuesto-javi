const Event = require("../models/Event");

class EventRepository {
  async findAll() {
    return await Event.find();
  }
  async findById(id) {
    return await Event.findById(id);
  }
  async create(event) {
    return await Event.create(event);
  }
  async update(id, update) {
    return await Event.findByIdAndUpdate(id, update);
  }
  async delete(id) {
    return await Event.findByIdAndDelete(id);
  }
}

module.exports = new EventRepository();
