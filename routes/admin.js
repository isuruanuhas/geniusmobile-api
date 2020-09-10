const express = require("express");
const router = express.Router();
const db = require("../models/product_db");

router.post("/", async (req, res) => {
  if (
    !req.body.productname ||
    !req.body.imgUrl ||
    !req.body.productid ||
    !req.body.quantity ||
    !req.body.price
  ) {
    return res
      .status(400)
      .json({ message: "Not all mandatory values have not bee been set!'" });
  }

  try {
    let alreadyproductId = await db.collection.findOne({
      id: req.body.productid,
    });
    if (alreadyproductId) {
      res.status(400).json({
        message: "this id is already in database please use another ID",
      });
    } else {
      let addDatatoStock = new db({
        id: req.body.productid,
        productName: req.body.productname,
        quantity: req.body.quantity,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
      });

      let addDatatoStockResult = await addDatatoStock.save();
      if (addDatatoStockResult.length === 0)
        return res
          .status(400)
          .json({ message: "please try again,'Data not inserted'" });

      return res.status(200).json({ result: addDatatoStockResult });
    }
  } catch (e) {
    //console.log(e.message);
    return res.status(500).send(e.message);
  }
});

router.put("/", async (req, res) => {
  try {
    if (!req.body.quantity) {
      return res.status(400).json({ error: "please provide the quantity" });
    }

    if (!req.body.productid) {
      return res.status(400).json({ error: "please provide the product id" });
    }

    let alreadyproduct = await db.collection.findOne({
      id: req.body.productid,
    });
    if (!alreadyproduct) {
      return res
        .status(400)
        .json({ error: "the given product id is not saved" });
    }

    let qtyUpdated = await db.collection.findOneAndUpdate(
      { id: req.body.productid },
      { $inc: { quantity: req.body.quantity } },
      { new: true, useFindAndModify: false }
    );

    if (qtyUpdated.length === 0)
      return res
        .status(400)
        .json({ error: "Data not updated,please try again" });

    return res.status(200).json({ result: qtyUpdated });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
