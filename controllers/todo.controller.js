const { BadRequestError, NotFoundError } = require("../utils/error");
const errorHandler = require("../utils/errorHandleWrapper")
const { v4: uuidv4 } = require("uuid");

const todos = [
  {
    id: "3e3a6646-bacb-4bc7-b17e-9d672581ae9d",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: "f5c48284-fa6b-4382-a68a-40b354fc3b0e",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "cf45abb7-1c37-4405-be2f-8ef5d9c4b1ce",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

exports.getTodos = errorHandler((req, res) => {
  res.status(200).json({
    success: true,
    data: todos,
  });
});

exports.getTodo = errorHandler((req, res) => {
  const foundIndex = todos.findIndex((item) => item.id === req.params.id);
  if (foundIndex < 0) throw new NotFoundError("Item not found.");
  res.status(200).json({
    success: true,
    data: todos[foundIndex],
  });
});

exports.createTodo = errorHandler((req, res) => {
  if (!req.body.text) throw new BadRequestError();
  const todo = {
    id: uuidv4(),
    text: req.body.text,
  };
  todos.unshift(todo);
  res.status(200).json({
    success: true,
    data: todos,
  });
});

exports.updateTodo = errorHandler((req, res) => {
  const foundIndex = todos.findIndex((item) => item.id === req.params.id);
  if (foundIndex < 0) throw new NotFoundError("Item not found.");
  if (!req.body.text) throw new BadRequestError();
  todos[foundIndex].text = req.body.text;
  res.status(200).json({
    success: true,
    data: todos[foundIndex],
  });
});

exports.deleteTodo = errorHandler((req, res) => {
  const foundIndex = todos.findIndex((item) => item.id === req.params.id);
  if (foundIndex < 0) throw new NotFoundError("Item not found.");
  todos.splice(foundIndex, 1);
  res.status(200).json({
    success: true,
    data: todos,
  });
});