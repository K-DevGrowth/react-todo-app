const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  content: String,
  completed: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

todoSchema.set("toJSON", {
  transform: (document, returnedTodo) => {
    returnedTodo.id = returnedTodo._id.toString();
    delete returnedTodo._id;
    delete returnedTodo.__v;
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
