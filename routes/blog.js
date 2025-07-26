const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const {
  handleAddNewBlog,
  handleAddCommentById,
  handleBlogViewById,
  handleCreateNewBlog,
} = require("../controllers/blogControllers");

// Applying Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Get Add Blog Route
router.get("/add-new", handleAddNewBlog);

// Route to handle blog creation (Post request)
router.post("/", upload.single("coverImage"), handleCreateNewBlog);

// Route to view a blog by ID (get request)
router.get("/:id", handleBlogViewById);

// Route to comment on a blog by blogId (post request)
router.post("/comment/:blogId", handleAddCommentById);
module.exports = router;
