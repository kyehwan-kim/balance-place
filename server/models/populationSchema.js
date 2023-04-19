const mongoose = require("mongoose");

const { Schema } = mongoose;

const populationDataSchema = new Schema(
  {
    area_name: {
      type: String,
      required: true,
      unique: true,
    },
    live_data: {
      type: Object,
      required: true,
    },
  },
  { collection: "data" }
);

module.exports = mongoose.model("PopulationData", populationDataSchema);
