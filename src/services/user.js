const UserRepository = require("../repository/User");
class UserService {
  async getAllUsers() {
    return await UserRepository.findAll();
  }
  async getUser(id) {
    return await UserRepository.findById(id);
  }
  async updateUser(id, update) {
    return await UserRepository.update(id, update);
  }
}

module.exports = new UserService();
