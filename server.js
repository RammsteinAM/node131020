const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const todoRoutes = require('./routes/todo.route')
const errorHandlerMiddleware = require('./utils/errorHandleMiddleware')
const port = 8080;

const app = express();

app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.use(errorHandlerMiddleware);

app.listen(port);
