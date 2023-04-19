const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "user" }
);

// mongoose라 가능한 문법
module.exports = mongoose.model("User", userSchema);
