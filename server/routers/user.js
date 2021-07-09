const express = require("express");

const router = new express.Router();

router.get("", (req, res) => {
  res.send({ text: "Hello" });
});

module.exports = router;
