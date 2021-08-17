const express = require('express');

const specificProductRoutes = express.Router();
let Product = require('../models/product');
let Vendor = require('../models/vendor');
specificProductRoutes.get(('/:productName'), function (req, res) {
    let name = req.params.productName;
    Product.find({ productName: name, productQuantity: { $gt: 0 }, productStatus: 'available' }, async function (err, products) {
        if (err) {
            console.log(err);
        }
        else {
            allproduct=[]
            for (product of products){
                // console.log(product)
                await Vendor.findById(product.productVendor, function (err, vendor) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        // console.log(vendor)
                        let rating='-';
                        // console.log(product)
                        if(vendor.numberOfRating==0||vendor.numberOfRating==null){
                            rating='-'
                        }
                        else{
                            rating=Number((vendor.totalRating/vendor.numberOfRating).toFixed(2))
                        }
                        let final={
                            _id: product._id,
                            productName: product.productName,
                            productQuantity:product.productQuantity,
                            productPrice:product.productPrice,
                            productStatus:product.productStatus,
                            productVendor:product.productVendor,
                            productVendorName:vendor.username,
                            productVendorRating:rating
                        }
                        allproduct.push(final)
                    }
                })
            }
            res.status(200).send(allproduct)
        }
    });
});

module.exports = specificProductRoutes;