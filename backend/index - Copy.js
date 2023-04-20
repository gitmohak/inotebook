const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/"
const connectToMongo = async () => {
   await mongoose.connect(mongoURI);
   app.listen(3000, () => console.log("Server started on port 3000"));
}
connectToMongo();

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});
