const express = require("express");
const {
  httpUserSignUp,
  httpUserSignIn,
  httpUpdateInfo,
} = require("./auth.controller.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

const authRouter = express.Router();

authRouter.post("/signup", httpUserSignUp);

authRouter.post("/signin", httpUserSignIn);

authRouter.put("/update", authMiddleware, httpUpdateInfo);

module.exports = authRouter;
