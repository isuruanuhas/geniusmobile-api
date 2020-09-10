const express = require("express");
const router = express.Router();
const db = require("../models/product_db");

router.get("/:productname", async (req, res) => {
  try {
    let product = await db.find({
      productName: { $regex: req.params.productname },
    });
    return res.status(200).json({
      response: product,
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }

  if (!req.params.productname) {
    return res
      .sendStatus(400)
      .send("The please Provide a productname to search ");
  }

  let product = await db.findById(req.params.productName);

  //   if (!product) {
  //     return res
  //       .sendStatus(400)
  //       .send("The given Id does not exist on our server");
  //   }

  res.send(product);
});

module.exports = router;
