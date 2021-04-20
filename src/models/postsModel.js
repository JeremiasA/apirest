const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
        type: String,
        required: true,
      },
    userId: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("posts", postsSchema);
