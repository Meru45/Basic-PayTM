const express = require("express");
const authRouter = require("./routes/auth/auth.routes.js");
const accountRouter = require("./routes/account/account.routes.js");
const usersRouter = require("./routes/users/users.routes.js");

const v1Wrapper = express.Router();

v1Wrapper.use("/auth", authRouter);
v1Wrapper.use("/account", accountRouter);
v1Wrapper.use("/user", usersRouter);

module.exports = v1Wrapper;
