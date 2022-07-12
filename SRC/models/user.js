const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "User",
    },
    createdOn: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
