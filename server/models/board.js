const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "board" }
);

// mongoose라 가능한 문법
module.exports = mongoose.model("Board", userSchema);
