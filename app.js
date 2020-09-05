
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost/geniusmobiledb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Db successfully ... "))
  .catch(err => console.log("Ërror has occured while connecting to db : ", err));

app.listen(PORT, function () {
    console.log("Listening on Port - " + PORT);
});
