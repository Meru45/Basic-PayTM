const express = require("express");
const { httpFilteredUsers } = require("./users.controller.js");

const usersRouter = express.Router();

usersRouter.get("/bulk", httpFilteredUsers);

module.exports = usersRouter;
