const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const auth = async (req, res, next) => {
  try {
    const token = JSON.parse(req.body.localStorage.token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!admin) {
      throw new Error();
    }
    // create a verubale inside of req names user with the datas of the fetched user
    req.token = token;
    req.admin = admin;

    next();
  } catch (e) {
    res.status(403).send(e);
  }
};
module.exports = auth;
