const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  //res.json({ posts: { title: "My post", description: "some data.." } });
  res.header("id", req.user._id).end();
});

module.exports = router;
