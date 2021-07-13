const express = require("express");
const User = require("../models/user");
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
    res.status(200).json();
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

module.exports = router;
