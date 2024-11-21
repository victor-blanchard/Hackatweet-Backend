const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  tweetName: String,
  tweetedTime: Date,
  tweetedByUser: String,
  likeCounter: Number,
  likedByUserName: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
