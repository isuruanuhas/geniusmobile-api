const express = require('express');
const router = express.Router();
const  db  = require('../models/product_db');


  router.post("/", async (req, res) => {
    
     if (!req.body.productname || !req.body.imgUrl || !req.body.productid || !req.body.quantity|| !req.body.price  ) {
      return res.status(400).json({meassage: "Not all mandatory values have not bee been set!'"});
    }
    
    

    try {
      let alreadyproductId = await db.collection.findOne({id:req.body.productid}); 
      if(alreadyproductId){
        res.status(400).json({meassage:"this id is already in databse please use another ID"});
      }
     else {

      let addDatatoStock = new db({
        id:req.body.productid,
        productName: req.body.productname,
        quantity : req.body.quantity,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
       
      });

  
      let addDatatoStockResult = await addDatatoStock.save();
      if(addDatatoStockResult.length===0)
         return res.status(400).json({message:"please try again,'Data not inserted'"});


        return res.status(201).json({result:addDatatoStockResult});


     }
      
    } catch (e) {
      return res.status(500).send(e.message);
    }
  });     


  module.exports = router;