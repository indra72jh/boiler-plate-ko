const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 5000;

const mogoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
