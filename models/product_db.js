const mongoose = require('mongoose');



const phoneSchema = new mongoose.Schema({
    id:{
        type: Number,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    productName: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true

    },quantity:{
        type: Number,
        minlength: 4,
        maxlength: 20,
        required: true


    },
    price:{
        type: Number,
        minlength: 4,
        maxlength: 20,
        required: true
    }, imgUrl:{
        type: String,
        minlength: 4,
        maxlength: 500,
        required: true
    }
});

const Phone = mongoose.model("Phone", phoneSchema);
module.exports = Phone;
