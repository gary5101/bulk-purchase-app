const express = require('express');
// const bodyParser = require('body-parser');
const vendorRoutes = express.Router();
let Vendor =require('../models/vendor');

vendorRoutes.get(('/'),function(req,res){
    Vendor.find(function(err,vendors){
        if(err) {
            console.log(err);
        }
        else {
            
            res.json(vendors);
        }
    });
});

vendorRoutes.post(('/'),function(req,res){
    let vendor =new Vendor(req.body)
    Vendor.find({username:req.body.username,password:req.body.password},function(err,vendors){
        if(err){
            console.log(err);
        }
        else{
            if (vendors.length!=0)
                res.send(false);
            else{
                vendor.save()
                .then(vendor => {
                    Vendor.find({username:req.body.username,password:req.body.password},function(err,vendors){
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.status(200).send(vendors);
                        }
                    })
                    // res.status(200).send('successfully added customer');
                })
                .catch(err =>{
                    // console.log(err)
                    res.status(400).send(err);
                });
            }
        }
    })
});

vendorRoutes.get(('/:id'),function(req,res){
    let id = req.params.id;
    Vendor.findById(id,function(err,vendors){
        if(err) {
            console.log(err);
        }
        else {
            res.json(vendors);
        }
    });
});

vendorRoutes.put(('/:id'),function(req,res){
    let id = req.params.id;
    console.log(req.body);
    Vendor.findByIdAndUpdate(id,req.body,function(err){
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).send('Successfully updated vendor');
        }
    });
});

vendorRoutes.delete(('/:id'),function(req,res){
    let id = req.params.id;
    Vendor.findByIdAndDelete(id,function(err,vendors){
        if(err){
            console.log(err);
        }
        else
        {
            res.status(400).send('Successfully deleted vendor');
        }
        
    });
});

module.exports = vendorRoutes;