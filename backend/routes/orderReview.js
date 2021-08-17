const express = require('express');
// const bodyParser = require('body-parser');
const orderReviewRoutes = express.Router();
let Order = require('../models/order');

orderReviewRoutes.put('/:id',function(req,res){
    Order.findByIdAndUpdate(req.params.id,req.body,function(err,order){
        if(err)
        {
            console.log(err)
        }
        else{
            console.log("hiii")
            res.status(200).send("updated review and rating")
        }
    })
})

module.exports=orderReviewRoutes