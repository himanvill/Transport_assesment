const mongoose = require("mongoose");

const config = require("../config.js");

mongoose
  .connect(config.mongoDb, { useNewUrlParser: true })
  .then(() => {
    console.log("successfully connected to the Database");
  })
  .catch((err) => [
    console.log("Error on connecting to DB", err),
    process.exit(),
  ]);
