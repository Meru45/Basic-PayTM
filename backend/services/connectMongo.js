const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connection.once("open", () => {
  console.log("Mongo connection is ready!");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URL);
}

module.exports = connectMongo;
