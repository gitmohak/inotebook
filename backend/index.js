const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = async () => {
   await mongoose.connect(mongoURI);
   app.listen(5000, () => console.log("Backend Server started on port 5000"));
}
connectToMongo();

var cors = require('cors');
const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});