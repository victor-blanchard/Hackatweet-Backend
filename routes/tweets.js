var express = require("express");
var router = express.Router();

require("../models/connection");
const { checkBody } = require("../modules/checkBody");
const Tweet = require("../models/tweets");
const User = require("../models/users");
router.post("/addTweet", (req, res) => {
  if (!checkBody(req.body, ["tweetName", "token"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ token: req.body.token }).then((data) => {
    if (data === null) {
      res.json({ result: false, error: data });
    } else {
      const now = Date();
      //   const currentDateTime = now.toISOString();
      const newTweet = new Tweet({
        tweetName: req.body.tweetName,
        tweetedTime: now,
        tweetedByUser: req.body.token,
        likeCounter: 0,
      });
      newTweet.save().then((newDoc) => {
        res.json({ result: true, tweetCreated: newDoc });
      });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["userName", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ userName: req.body.userName }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
