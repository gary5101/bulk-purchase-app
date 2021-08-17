const express = require('express');
const customerAuthRoutes= express.Router();
let Customer= require('../models/customer');

customerAuthRoutes.post(('/'),function(req,res){
    Customer.find({username:req.body.username,password:req.body.password},function(err,customer){
        if(err){
            console.log(err);
        }
        else{
            if(customer.length==0)
            {
                res.status(200).send(false)
            }
            else{
                res.status(200).send(customer)
            }
        }
    })
});



module.exports=customerAuthRoutes