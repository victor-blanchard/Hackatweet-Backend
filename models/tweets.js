const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  tweetName: String,
  tweetedTime: Date,
  tweetedByUser: String,
  likeCounter: Number,
  hashtags: [String],
  likedByUserToken: [],
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
