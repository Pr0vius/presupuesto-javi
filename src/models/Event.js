const { Schema, model } = require("mongoose");

const event = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    expenses: [
      {
        products: String,
        amount: Number,
        price: Number,
        user: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Event", event);
