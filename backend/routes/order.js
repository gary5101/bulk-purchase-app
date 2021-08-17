const express = require('express');
// const bodyParser = require('body-parser');
const orderRoutes = express.Router();
let Order = require('../models/order');
let Product = require('../models/product');
let Vendor = require('../models/vendor');
orderRoutes.get(('/:id'), function (req, res) {
    let customerid = req.params.id
    Order.find({ orderCustomer: customerid }, async function (err, orders) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(orders);
            let allorders = []
            for (let order=0; order<orders.length; order++) {
                // console.log(order)
                await Product.findById(orders[order].orderProduct, async function (err, product) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // console.log(product)
                        await Vendor.findById(product.productVendor, function (err, vendor) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                // console.log(orders[order])
                                let orderStatus = ''
                                if (product.productStatus == 'available' && product.productQuantity > 0) {
                                    orderStatus = 'Waiting'
                                }
                                else if (product.productStatus == 'available' && product.productQuantity == 0) {
                                    orderStatus = 'Placed'
                                }
                                else if (product.productStatus == 'dispatched') {
                                    orderStatus = 'Dispatched'
                                }
                                else {
                                    orderStatus = 'Cancelled'
                                }
                                let eachOrder = {
                                    id: orders[order]._id,
                                    productVendorId: vendor._id,
                                    productVendorTotalRating: vendor.totalRating,
                                    productVendorNumberOfRating:vendor.numberOfRating,
                                    productVendor: vendor.username,
                                    productName: product.productName,
                                    orderPrice: product.productPrice * orders[order].orderQuantity,
                                    orderQuantity: orders[order].orderQuantity,
                                    orderStatus: orderStatus,
                                    productLeft: product.productQuantity,
                                }
                                // console.log(eachOrder)
                                allorders.push(eachOrder)
                                // console.log(allorders)
                            }
                        })
                    }
                })
            }
            setTimeout(()=>{
            // console.log(allorders)
            res.status(200).send(allorders);
            },300)
        }
    });
});

orderRoutes.post(('/'), function (req, res) {
    let order = new Order(req.body)
    Product.findById(req.body.orderProduct, function (err, product) {
        if (err) {
            console.log(err);
        }
        else {
            if (req.body.orderQuantity > product.productQuantity) {
                res.status(400).send('quantity exceeded');
            }
            else {
                let netquantity = product.productQuantity - req.body.orderQuantity
                body = { 'productQuantity': netquantity };
                Product.findByIdAndUpdate(req.body.orderProduct, body, function (err, prod) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        order.save()
                            .then(order => {
                                res.status(200).send('successfully added order');
                            })
                            .catch(err => {
                                // console.log(err)
                                res.status(400).send(err);
                            });
                    }
                })
            }
        }
    })


});

orderRoutes.get(('/'), function (req, res) {
    Order.find(function (err, orders) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

orderRoutes.put(('/:id'), function (req, res) {
    let id = req.params.id;
    Order.findById(id, async function (err, order) {
        if (err) {
            console.log(err);
        }
        else {
            await Product.findById(order.orderProduct, async function (err, product) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (product.productQuantity + order.orderQuantity < req.body.orderQuantity) {
                        res.status(400).send('quantity exceeded');
                    }
                    else {
                        let netquantity = product.productQuantity + order.orderQuantity - req.body.orderQuantity;
                        body = { 'productQuantity': netquantity };
                        await Product.findByIdAndUpdate(order.orderProduct, body, async function (err, prod) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                await Order.findByIdAndUpdate(id, req.body, function (err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        res.status(200).send('Successfully updated order');
                                    }
                                });
                            }
                        })
                    }
                }
            })
        }
    })

});


orderRoutes.delete(('/:id'), function (req, res) {
    let id = req.params.id;
    Order.findByIdAndDelete(id, function (err, orders) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(400).send('Successfully deleted order');
        }

    });
});

module.exports = orderRoutes;