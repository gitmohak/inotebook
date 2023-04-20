const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/";
const express = require("express");

const app = express();

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  app.listen(3000, () => console.log("Server started on port 3000"));
}

module.exports = connectToMongo;