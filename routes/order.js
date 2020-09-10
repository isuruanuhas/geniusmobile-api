const express = require("express");
const router = express.Router();
const db = require("../models/odersDb");
const dbProd = require("../models/product_db");

router.put("/", async (req, res) => {
  try {
    if (!req.body.quantity) {
      return res.status(400).json({ meassage: "please provide the quantity" });
    }

    if (!req.body.productid) {
      return res
        .status(400)
        .json({ meassage: "please provide the product id" });
    }

    let alreadyproduct = await dbProd.collection.findOne({
      id: req.body.productid,
    });
    if (!alreadyproduct) {
      return res
        .status(400)
        .json({ meassage: "the given product id is not saved" });
    }

    let qtyUpdated = await dbProd.collection.findOneAndUpdate(
      { id: req.body.productid },
      { $inc: { quantity: req.body.quantity * -1 } },
      { new: true, useFindAndModify: false }
    );
    if (qtyUpdated.length === 0)
      return res
        .status(400)
        .json({ meassage: "Data not updated,please try again" });

    return res.status(200).json({ result: qtyUpdated });
  } catch (e) {
    //console.log(e);
    return res.status(500).send(e.message);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.productname || !req.body.total) {
    return res
      .status(400)
      .json({ meassage: "Not all mandatory values have not bee been set!'" });
  }

  try {
    let addDatatoStock = new db({
      productName: req.body.productname,
      total: req.body.total,
    });

    let addDatatoStockResult = await addDatatoStock.save();
    if (addDatatoStockResult.length === 0)
      return res
        .status(400)
        .json({ message: "please try again,'Data not inserted'" });

    return res.status(200).json({ result: addDatatoStockResult });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
