const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("", (req, res) => {
  res.send({ text: "Hello" });
});

router.post("/sign-up", auth, async (req, res) => {
  // console.log(req.body);
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

    let options = {
      path: "/",
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
      httpOnly: true, // The cookie only accessible by the web server
    };

    res.cookie("x-access-token", token, options);
    res.json(token);
    console.log(user);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
