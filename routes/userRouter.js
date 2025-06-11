const express = require("express");
const router = express.Router();
const userModal = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await userModal.create({
      fullname,
      email,
      password: hash,
    });

    const token = jwt.sign({ email, _id: createdUser._id }, "secret");
    res.cookie("token", token);
    res.send("User created successfully");

  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;