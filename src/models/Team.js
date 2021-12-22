const { Schema, model } = require("mongoose");

const team = new Schema({
  name: { type: String, required: true, unique: true },
  leader: { type: Schema.Types.ObjectId, ref: "User" },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  budget: { type: Number, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }]
});

module.export = model("Team", team);
