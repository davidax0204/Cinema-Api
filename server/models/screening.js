const mongoose = require("mongoose");
const validator = require("validator");

const screeningSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  times: [
    {
      type: String,
    },
  ],
  teathers: [
    {
      type: String,
    },
  ],
});

const Screening = mongoose.model("Screening", screeningSchema);

module.exports = Screening;
