const express = require("express");
const router = express.Router();
const db = require("../models/product_db");

router.get("/", async (req, res) => {
  try {
    let phones = await db.find();
    if (phones.length === 0)
      return res
        .status(400)
        .json({ meassage: "No Data available at ths moment" });
    else {
      return res.send(phones);
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
