const express = require("express");
const User = require("../models/user");
const Movie = require("../models/movie");
const Teather = require("../models/teather");
const Admin = require("../models/admin");
const auth = require("../middleware/admin-auth");

const router = new express.Router();

router.post("/admin/sign-in", async (req, res) => {
  try {
    if (
      req.body.email === "admin@admin.com" &&
      req.body.password === "admin0204"
    ) {
      const admin = await Admin.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await admin.generateAuthToken();
      res.json(token);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/admin/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
  }
});

router.post("/admin/getUser", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
  }
});

router.get("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    res.status(200).send(movie);
  } catch (e) {
    console.log(e);
  }
});

router.post("/admin/getMovie", auth, async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.body.id });
    res.status(200).send(movie);
  } catch (e) {
    console.log(e);
  }
});

router.post("/admin/changeUser", auth, async (req, res) => {
  const updates = Object.keys(req.body.userData);
  try {
    const user = await User.findOne({ _id: req.body.id });
    updates.forEach((update) => (user[update] = req.body.userData[update]));
    await user.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});
router.post("/admin/changeMovie", auth, async (req, res) => {
  const updates = Object.keys(req.body.editedMovieData);
  try {
    const movie = await Movie.findOne({ _id: req.body.id });
    updates.forEach(
      (update) => (movie[update] = req.body.editedMovieData[update])
    );
    await movie.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/admin/deleteUser", auth, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.id });
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/admin/deleteMovie", auth, async (req, res) => {
  try {
    await Movie.findOneAndDelete({ _id: req.body.id });
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/admin/isAdmin", auth, async (req, res) => {
  try {
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/admin/logout", auth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/admin/add-movie", auth, async (req, res) => {
  try {
    const movie = new Movie(req.body.movie);
    for (let i = 1; i < 57; i++) {
      movie.seats.push({ seat: i, occupied: false });
    }
    await movie.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.post("/admin/add-teather", auth, async (req, res) => {
  try {
    const teather = new Teather(req.body.teather);
    for (let movie = 0; movie < req.body.teather.movies.length; movie++) {
      const findMovie = await Movie.findOne({
        _id: req.body.teather.movies[movie],
      });
      findMovie.seats = [];
      for (let i = 1; i < teather.seats + 1; i++) {
        findMovie.seats.push({ seat: i, occupied: false });
      }
      await findMovie.save();
    }
    await teather.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

module.exports = router;
