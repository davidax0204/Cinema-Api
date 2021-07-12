const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.get("", (req, res) => {
  res.send({ text: "Hello" });
});

router.post("", async (req, res) => {
  const user = new User(req.body);
  try {
    await User.findExistingUsers(user.email);
    await user.save();
    res.status(200).json();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
