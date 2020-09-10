const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400).json({ message: "username required" });
    }

    if (!req.body.email) {
      res.status(400).json({ message: "email required" });
    }
    if (!req.body.password) {
      res.status(400).json({ message: "password required" });
    }

    let excistuser = await User.findOne({ email: req.body.email });
    if (excistuser) {
      return res.status(400).json({ message: "this email already taken" });
    }

    let salt = await bcrypt.genSalt(10);
    let psw = await bcrypt.hash(req.body.password, salt);
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: psw,
    });

    const resposne = user.save();
    res.status(200).json({
      message: "success",
      response: resposne,
    });
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/", async (req, res) => {
  const token = req.header("x-jwt-token");
  console.log(token);
});

module.exports = router;
