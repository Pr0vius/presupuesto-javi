const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../helpers/ErrorResponse");
const UserRepository = require("../repository/User");
const config = require("../config");

class AuthService {
  async register(user) {
    user.password = await this._encrypt(user.password);
    const newUser = await UserRepository.create(user);
    const token = await this._generateToken(newUser._id);

    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      img: user.img,
      role: user.role,
      token,
    };
  }

  async login(email, password) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new ErrorResponse(400, undefined, "Email or password are wrong");
    }
    await this._validatePassword(
      password,
      user.password,
      "Email or password are wrong"
    );
    const token = this.encrypt(user._id);
    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token,
    };
  }

  async _generateToken(id) {
    return jwt.sign({ id }, config.jwt.secret, {
      expiresIn: config.jwt.expires,
    });
  }

  async _encrypt(password) {
    return await bcrypt.hash(password, 10);
  }

  async _validatePassword(password, encryptedPassword, errorMessage) {
    const validPassword = await bcrypt.compare(password, encryptedPassword);
    if (!validPassword) {
      throw new ErrorResponse(400, undefined, errorMessage);
    }
  }

  async validateToken(token) {
    if (!token) {
      throw new ErrorResponse(401, "Authentication Failed", "Token Required");
    }
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const id = decoded.id;
      const user = await UserRepository.findUserById(id);
      if (!user) {
        throw new ErrorResponse(401, "Authentication Failed", "Invalid Token");
      }
      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        company: user.company,
      };
    } catch (error) {
      throw new ErrorResponse(401, "Authentication Failed", "Invalid Token");
    }
  }
}

module.exports = new AuthService();
