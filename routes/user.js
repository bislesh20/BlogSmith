const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { handleSignIn, handleSignUp } = require("../controllers/authContoller");

// handle singnin request
router.get("/signin", (req, res) => {
  return res.render("signin");
});

// handle signup request
router.get("/signup", (req, res) => {
  return res.render("signup");
});

// handle logout request
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

// handle post request from signin
router.post("/signin", handleSignIn);

// handle post request from signup
router.post("/signup", handleSignUp);

module.exports = router;
