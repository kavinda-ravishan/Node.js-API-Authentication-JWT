const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/", verify, (req, res) => {
  //res.json({ posts: { title: "My post", description: "some data.." } });
  res.send(req.user._id);
});

module.exports = router;
