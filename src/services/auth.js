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
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      img: user.img,
      role: user.role,
      token,
    };
  }

  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new ErrorResponse(400, undefined, "Email or password are wrong");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ErrorResponse(400, undefined, "Email or password are wrong");
    }
    const token = await this._generateToken(user._id);
    return {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      img: user.img,
      email: user.email,
      role: user.role,
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

  async validateToken(token) {
    if (!token) {
      throw new ErrorResponse(401, "Authentication Failed", "Token Required");
    }
    if (!token.startsWith("Bearer")) {
      throw new ErrorResponse(400, "Authentication Failed", "Invalid Token");
    }
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const id = decoded.id;
      const user = await UserRepository.findById(id);
      if (!user) {
        throw new ErrorResponse(400, "Authentication Failed", "Invalid Token");
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

  validateRole(user, ...roles) {
    if (!roles.includes(user.role)) {
      throw new ErrorResponse(400, "Authorization failed", "Unauthorized user");
    }
    return true;
  }
}

module.exports = new AuthService();
