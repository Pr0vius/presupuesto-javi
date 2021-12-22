const { Schema, model } = require("mongoose");
const { ROLES, USER_ROLE } = require("../constants");

const user = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  role: {
    type: String,
    required: true,
    default: USER_ROLE,
    enum: ROLES,
  },
});

module.exports = model("User", user);
