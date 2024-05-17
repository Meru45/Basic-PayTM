const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleWare.js");
const { httpGetBalance, httpTransfer } = require("./account.controller.js");

const accountRouter = express.Router();

accountRouter.use(authMiddleware);

accountRouter.get("/balance", httpGetBalance);
accountRouter.post("/transfer", httpTransfer);

module.exports = accountRouter;
