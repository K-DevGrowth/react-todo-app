const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  await user.save();
  res.status(201).json(user);
});

module.exports = usersRouter;
