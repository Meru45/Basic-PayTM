const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectMongo = require("./services/connectMongo.js");
const v1Wrapper = require("./v1Wrapper.js");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

app.use(bodyParser.json());

app.use("/api/v1", v1Wrapper);

async function startServer() {
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`listening at port: ${PORT}...`);
  });
}

startServer();
