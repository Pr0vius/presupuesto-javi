const { Schema, model } = require("mongoose");

const event = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    expenses: [
      {
        product_name: { type: String, required: true },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Event", event);
