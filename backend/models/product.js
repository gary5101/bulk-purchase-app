const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productQuantity:{
        type: Number,
        required: true
    },
    productVendor:{
        type: String,
        required: true
    },
    productStatus:{
        type: String,
        required: true
    },
        
});

module.exports = mongoose.model('Product', Product);