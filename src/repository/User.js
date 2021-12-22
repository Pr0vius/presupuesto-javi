const User = require("../models/User");

class UserRepository {
  async create(user) {
    return await User.create(user);
  }
  async findUser(user) {
    return await User.findOne({ user });
  }
  async findByEmail(email) {
    return await User.findOne({ email });
  }
  async findById(id) {
    return await User.findById(id);
  }
}

module.exports = new UserRepository();
