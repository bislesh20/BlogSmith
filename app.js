require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { Blog } = require("./models/blog");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const app = express();
const PORT = process.env.PORT || 8000;

// connection with MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected..."));
// middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(express.json());

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}...`);
});
