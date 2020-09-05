const express = require('express');
const PhoneModel = require('../models/db');
const router = express.Router();

router.get('/', async (req,res)=>
{
    let phones = await PhoneModel.find();
    res.send(phones);
});