const express = require('express');
// const bodyParser = require('body-parser');
const customerRoutes = express.Router();
let Customer =require('../models/customer');

customerRoutes.get(('/'),function(req,res){
    Customer.find(function(err,customers){
        if(err) {
            console.log(err);
        }
        else {
            res.json(customers);
        }
    });
});

customerRoutes.post(('/'),function(req,res){
    let customer =new Customer(req.body)
    Customer.find({username:req.body.username,password:req.body.password},function(err,customers){
        if(err){
            console.log(err);
        }
        else{
            if (customers.length!=0)
                res.send(false);
            else{
                customer.save()
                .then(customer => {
                    Customer.find({username:req.body.username,password:req.body.password},function(err,customers){
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.status(200).send(customers);
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

customerRoutes.get(('/:id'),function(req,res){
    let id = req.params.id;
    Customer.findById(id,function(err,customers){
        if(err) {
            console.log(err);
        }
        else {
            res.json(customers);
        }
    });
});

customerRoutes.put(('/:id'),function(req,res){
    let id = req.params.id;
    console.log(req.body);
    Customer.findByIdAndUpdate(id,req.body,function(err){
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).send('Successfully updated customer');
        }
    });
});

customerRoutes.delete(('/:id'),function(req,res){
    let id = req.params.id;
    Customer.findByIdAndDelete(id,function(err,customers){
        if(err){
            console.log(err);
        }
        else
        {
            res.status(200).send('Successfully deleted customer');
        }
        
    });
});

module.exports = customerRoutes;