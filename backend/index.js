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

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});