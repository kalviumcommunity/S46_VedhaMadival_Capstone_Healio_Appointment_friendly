const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/", userRoute);

mongoose.connect(process.env.MONGO_URI).then(() =>
  app.listen(process.env.PORT, () => {
    console.log("Server Listening to PORT", process.env.PORT);
  })
);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB is connected Successfully");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

app.get("/", (req, res) => {
  res.json({ message: "Capstone Get request" });
});

module.exports = mongoose;