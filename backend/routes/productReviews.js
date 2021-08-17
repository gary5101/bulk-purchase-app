const express = require('express');
const productReviews= express.Router();
// let Vendor= require('../models/vendor');
let Product =require('../models/product');
let Order=require('../models/order');

productReviews.get(('/:productid'),function(req,res){
    let productid=req.params.productid;
    Order.find({orderProduct:productid},function(err,product){
        if (err){
            console.log(err);
        }
        else {
            res.status(200).send(product);
        }
    })
})


module.exports=productReviews;