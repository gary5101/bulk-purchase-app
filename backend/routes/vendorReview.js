const express = require('express');
// const bodyParser = require('body-parser');
const vendorReviewRoutes = express.Router();
let Order = require('../models/order');
let Product = require('../models/product');

vendorReviewRoutes.get(('/:vendorid'),function(req,res){
    let vendorid= req.params.vendorid;
    console.log('hi');
    Product.find({productVendor:vendorid},async function(err,products){
        if(err){
            console.log(err);
        }
        else {
            console.log(products);
            var allreviews=[];
            for(let i in products) {
                console.log(i)    
                await Order.find({orderProduct:products[i]._id},function(err,orders){
                    if(err){
                        console.log(err);
                    }
                    else {
                        console.log(orders);
                        for (let order of orders){
                            if (order.orderReview!=null||order.orderRating!=null){
                                allreviews.push(order);
                            }
                        }
                    }
                })
            }
            console.log(allreviews);
            res.status(200).send(allreviews);
        }
    })
})
module.exports=vendorReviewRoutes;
