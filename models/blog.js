const mongoose = require("mongoose");
const { applyTimestamps } = require("./user");
const Schema = mongoose.Schema;
const model = mongoose.model;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("blog", blogSchema);
module.exports = { Blog };
