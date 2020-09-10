const mongoose = require("mongoose");

const oderSchema = new mongoose.Schema({
  total: {
    type: Number,
    minlength: 1,
    maxlength: 20,
    required: true,
  },
  productName: {
    type: String,
    minlength: 1,
    maxlength: 1000,
    required: true,
  },
});

const Oders = mongoose.model("oders", oderSchema);
module.exports = Oders;
