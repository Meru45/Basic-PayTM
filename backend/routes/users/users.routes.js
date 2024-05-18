const express = require("express");
const { httpFilteredUsers } = require("./users.controller.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

const usersRouter = express.Router();

usersRouter.use(authMiddleware);

usersRouter.get("/bulk", httpFilteredUsers);

module.exports = usersRouter;
