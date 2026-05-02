const Todo = require("../models/todo");

const todosRouter = require("express").Router();

todosRouter.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).json(todos);
});

module.exports = todosRouter;
