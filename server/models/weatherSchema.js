const mongoose = require("mongoose");

const { Schema } = mongoose;

const weatherDataSchema = new Schema(
  {
    temperature: {
      type: String,
      required: true,
    },
    sen_temperature: {
      type: String,
      required: true,
    },
    min_temperature: {
      type: String,
      required: true,
    },
    max_temperature: {
      type: String,
      required: true,
    },
    pcp_msg: {
      type: String,
      required: true,
    },
    air_idx: {
      type: String,
      required: true,
    },
    fcst_24hours: {
      type: Object,
      required: true,
    },
  },
  { collection: "weather" }
);

module.exports = mongoose.model("weatherData", weatherDataSchema);
