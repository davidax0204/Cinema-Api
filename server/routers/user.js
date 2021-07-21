const express = require("express");
const User = require("../models/user");
const Movie = require("../models/movie");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("", (req, res) => {
  res.send({ text: "Hello" });
});

router.post("/sign-up", async (req, res) => {
  const user = new User(req.body.user);
  try {
    await User.findExistingUsers(user.email);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).json(token);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.json(token);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/profile", auth, async (req, res) => {
  try {
    res.send();
  } catch (e) {
    res.send(e);
  }
});

router.post("/isLoged", auth, async (req, res) => {
  try {
    res.status(200).send(true);
  } catch (e) {
    res.status(403).send(e);
  }
});

router.post("/read-profile", auth, async (req, res) => {
  try {
    res.status(200).send({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      age: req.user.age,
      email: req.user.email,
    });
  } catch (e) {
    res.status(403).send(e);
  }
});

router.post("/profile-edit", auth, async (req, res) => {
  const updates = Object.keys(req.body.user);
  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body.user[update]));
    await user.save();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/profile/logOut", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/buyTickets", auth, async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.body.movieId });
    // console.log(req.body.selectedSeats);
    for (let i = 0; i < req.body.selectedSeats.length; i++) {
      movie.seats[req.body.selectedSeats[i]].occupied = true;
    }
    await movie.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
