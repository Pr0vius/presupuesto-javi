const { Schema, model } = require("mongoose");

const team = new Schema({
  name: { type: String, required: true, unique: true },
  members: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      position: { type: String, required: true },
    },
  ],
  budget: { type: Number, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = model("Team", team);
