const UserRepository = require("../repository/User");
class UserService {
  async getAllUsers() {
    return await UserRepository.findAll();
  }
  async getUser(id) {
    const { _id, firstname, lastname, email, img, role } =
      await UserRepository.findById(id);
    return { _id, firstname, lastname, email, img, role };
  }
  async updateUser(id, update) {
    const { _id, firstname, lastname, email, img, role } =
      await UserRepository.update(id, update);
    return { _id, firstname, lastname, email, img, role };
  }
}

module.exports = new UserService();
