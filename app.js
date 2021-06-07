const express = require("express");
const logger = require("morgan");

const app = express();

const userRouter = require("./routes/user/userRouter");

app.use(logger("dev"));

app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

module.exports = app;

/* We use morgan and express to start building our server. Userrouter is brought in that has all our functions and post requests.

We export app for use in our server.js file.

*/
