const router = require("express").Router();
const User = require("../model/User");
const { registrValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register the user Page
router.get("/login", async (req, res) => {
  const path = __dirname.replace("routes", "");
  res.sendFile(`${path}client/login.html`);
});

//login
router.post("/login", async (req, res) => {
  //Valiate the data befor login the user

  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).header("error", error.details[0].message).end();
  }

  //Chech if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).header("error", "Email dosnot Exists!").end();
  }

  //Now user is logged in//

  //Match the password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).header("error", "Password invalid !").end();

  //Craet and assigned a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.setHeader("auth-token", token);
  res.setHeader("name", user.name);
  res.end();
});

//Register the user
router.post("/register", async (req, res) => {
  //Valiate the data befor make a user
  const { error } = registrValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Chech if the user already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already Exists!");
  }

  //HASH the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Creating a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const saveUser = await user.save();
    res.send({ user: saveUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
