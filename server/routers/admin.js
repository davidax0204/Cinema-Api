const express = require("express");
const User = require("../models/user");
const Admin = require("../models/admin");
const auth = require("../middleware/auth");

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

module.exports = router;
