const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const home = require("./routes/home");
const admin = require("./routes/admin");
const order = require("./routes/order");
const search = require("./routes/search");
const users = require("./routes/users");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/", home);
app.use("/admin", admin);
app.use("/order", order);
app.use("/search", search);
app.use("/users", users);
mongoose
  .connect("mongodb://localhost/geniusmobiledb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Db successfully ... "))
  .catch((err) =>
    console.log("Ërror has occured while connecting to db : ", err)
  );

app.listen(PORT, function () {
  console.log("Listening on Port - " + PORT);
});
