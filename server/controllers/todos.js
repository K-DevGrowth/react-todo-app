const todosRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/todo");
const User = require("../models/user");
const config = require("../utils/config");

const getTokenFrom = (req) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

todosRouter.get("/", async (req, res) => {
  const todos = await Todo.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.status(200).json(todos);
});

todosRouter.post("/", async (req, res) => {
  const body = req.body;

  const decodedToken = jwt.decode(getTokenFrom(req), config.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({
      error: "token invalid",
    });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(400).json({
      error: "UserId missing or not valid",
    });
  }

  const todo = new Todo({
    content: body.content,
    completed: body.completed || false,
    user: user._id,
  });

  const savedTodo = await todo.save();
  user.todos = user.todos.concat(savedTodo);
  await user.save();

  res.status(201).json(savedTodo);
});

module.exports = todosRouter;
