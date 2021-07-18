const express = require("express");
const User = require("../models/user");
const Admin = require("../models/admin");
const auth = require("../middleware/admin-auth");
const Movie = require("../models/movie");

const router = new express.Router();

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
