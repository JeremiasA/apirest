const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const responsesSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: String,
    postId: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("responses", responsesSchema);
