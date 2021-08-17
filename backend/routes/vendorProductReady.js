const express = require('express');
const vendorProductRoutes= express.Router();
// let Vendor= require('../models/vendor');
let Product =require('../models/product');
// let Order=require('../models/order');

vendorProductRoutes.get(('/:vendorid'),function(req,res){
    let vendorid = req.params.vendorid;
    // console.log(req.params);
    Product.find({productVendor:vendorid, productStatus:'available' ,productQuantity:0},function(err,product){
        if(err){
            console.log(err);
        }
        else {
            res.status(200).send(product);
        }
    });
});

module.exports=vendorProductRoutes;