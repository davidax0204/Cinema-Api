const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.get("", (req, res) => {
  res.send({ text: "Hello" });
});

router.post("", async (req, res) => {
  const user = new User(req.body);
  await user.save();
});

module.exports = router;
