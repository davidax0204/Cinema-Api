const mongoose = require("mongoose");
const validator = require("validator");

const teatherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  movies: [
    {
      type: String,
    },
  ],
});

const Teather = mongoose.model("Teather", teatherSchema);

module.exports = Teather;
