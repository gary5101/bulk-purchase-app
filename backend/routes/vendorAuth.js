const express = require('express');
const vendorAuthRoutes= express.Router();
let Vendor= require('../models/vendor');

vendorAuthRoutes.post(('/'),function(req,res){
    console.log('hihello');
    Vendor.find({'username':req.body.username,'password':req.body.password},function(err,vendor){
        if(err){
            console.log(err);
        }
        else{
            if(vendor.length==0)
            {
                res.status(200).send(false)
            }
            else{
                res.status(200).send(vendor)
            }
        }
    })
});

module.exports=vendorAuthRoutes;

