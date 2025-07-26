const { Blog } = require("../models/blog");
const { Comment } = require("../models/comments");

async function handleAddNewBlog(req, res) {
  try {
    return res.render("addBlog", {
      user: req.user,
    });
  } catch (error) {
    console.error("Error in GET /add-new:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function handleCreateNewBlog(req, res) {
  try {
    const { title, body } = req.body;
    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });

    return res.render("addBlog", {
      user: req.user,
      success: true,
    });
  } catch (error) {
    console.error("Error in POST /blog:", error);
    return res.status(500).send("Failed to create blog post");
  }
}
async function handleBlogViewById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error("Error in GET /:id:", error);
    return res.status(500).send("Blog not found or internal error");
  }
}

async function handleAddCommentById(req, res) {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });

    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.error("Error in POST /comment:", error);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  handleAddNewBlog,
  handleAddCommentById,
  handleBlogViewById,
  handleCreateNewBlog,
};
