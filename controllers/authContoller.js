const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTokenForUser } = require("../services/auth");
const JWT_SECRET = process.env.JWT_SECRET;

async function handleSignUp(req, res) {
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    // 🔹 Create JWT for new user
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // 🔹 Set cookie and redirect (auto login)
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    res.render("signup", { err: "SignUp Failed", user: null });
  }
}

async function handleSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("signup", {
        error: "User not found. Please sign up.",
        user: null,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("signin", {
        error: "Incorrect Email or Password",
        user: null,
      });
    }
    const token = createTokenForUser(user);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    console.log(err);
    res.render("signin", { err: "Login Failed" });
  }
}

module.exports = {
  handleSignIn,
  handleSignUp,
};
