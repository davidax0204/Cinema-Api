const express = require("express");
const User = require("../models/user");
const Teather = require("../models/teather");
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

router.get("/teathers", async (req, res) => {
  try {
    const teathers = await Teather.find({});
    res.status(200).send(teathers);
  } catch (e) {
    console.log(e);
  }
});

router.post("/teather-movies", async (req, res) => {
  try {
    const teather = await Teather.findOne({ _id: req.body.teatherId });
    const movieList = [];
    for (let i = 0; i < teather.movies.length; i++) {
      const movie = await Movie.findOne({ _id: teather.movies[i] });
      movieList.push(movie);
      console.log(movie);
    }
    res.status(200).send(movieList);
  } catch (e) {
    console.log(e);
  }
});

router.post("/movie-seat-color", async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.body.movieId });
    if (movie.seats[req.body.seatNumber].occupied) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
    // console.log(movieSeat);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
