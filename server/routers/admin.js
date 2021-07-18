const express = require("express");
const User = require("../models/user");
const Movie = require("../models/movie");
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
    const movie = await Movie.findOneAndDelete({ _id: req.body.id });
    res.status(200).send();
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
    await movie.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
